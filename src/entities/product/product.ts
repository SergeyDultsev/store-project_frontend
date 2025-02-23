import {action, makeAutoObservable, toJS} from "mobx";
import IProduct from "@/types/product/iProduct";
import {getProducts} from "@/features/productServices/getProducts";
import cart from '@/entities/cart/cart';

class product{
    productData: IProduct[] = [];

    constructor() {
        makeAutoObservable(this, {
            getProducts: action,
        });
    }

    async getProducts() {
        try {
            if (this.productData.length === 0) {
                const response = await getProducts();
                if (response && response.data) {
                    this.compareCartAndProduct(toJS(response.data.products));
                }
            }
        } catch (error) {
            return null;
        }
    }

    setProduct(products: IProduct[]){
        this.productData = products;
    }

    changeStateProduct(productId: string){
        const productItem = this.productData.find((item) => item.product_id === productId);
        if(!productItem) return null;
        productItem.product_state === 'in_cart' ? productItem.product_state = 'available' : productItem.product_state = 'in_cart';
    }

    /*
        Сравниваю корзину с каталогом для измения состояния в катологе
    */
    compareCartAndProduct(products: IProduct[]) {
        const cartData = cart.cartData;
        const updateProductData = products.map((product => {
            const inCart = cartData.some(productCart => product.product_id === productCart.product_id);
            return {...product, product_state: inCart ? 'in_cart' : product.product_state};
        }));
        this.setProduct(updateProductData);
    }
}

export default new product;