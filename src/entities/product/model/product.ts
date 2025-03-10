import {action, makeAutoObservable, toJS} from "mobx";
import IProduct from "@/entities/product/model/types/iProduct";
import {getProducts} from "@/features/product/get-product/getProducts";
import cart from '@/entities/cart/model/cart';
import IResponse from "@/shared/types/iResponse";
import ICartProduct from "@/entities/cart/model/types/iCartProduct";

class product{
    productData: IProduct[] = [];

    constructor() {
        makeAutoObservable(this, {
            getProducts: action,
        });
    }

    async getProducts(): Promise<null|undefined>  {
        try {
            if (this.productData.length === 0) {
                const response: IResponse<any> | null = await getProducts();
                if (response && response.data) {
                    this.compareCartAndProduct(toJS(response.data.products));
                }
            }
        } catch (error) {
            return null;
        }
    }

    setProduct(products: IProduct[]): void{
        this.productData = products;
    }

    /*
         Изменение статуса продукта при добавлении/удалении из корзины
     */
    changeStateProduct(productId: string): null|undefined{
        const productItem: IProduct | undefined = this.productData.find((item : IProduct): boolean => item.product_id === productId);
        if(!productItem) return null;
        productItem.product_state === 'in_cart' ? productItem.product_state = 'available' : productItem.product_state = 'in_cart';
    }

    /*
        Сравниваю корзину с каталогом для измения состояния в катологе
    */
    compareCartAndProduct(products: IProduct[]): void {
        const cartData:ICartProduct[] = cart.cartData;
        const updateProductData :any[] = products.map((product => {
            const inCart: boolean = cartData.some(productCart=> product.product_id === productCart.product_id);
            return {...product, product_state: inCart ? 'in_cart' : product.product_state};
        }));
        this.setProduct(updateProductData);
    }

    /*
        Сброс статуса после покупки
    */
    resetStatus(productId: string): void{
        this.productData.forEach((item: IProduct) => {
            if (productId === item.product_id) {
                item.product_state = 'available';
            }
        });
    }
}

export default new product;