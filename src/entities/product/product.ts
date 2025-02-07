import {action, makeAutoObservable, toJS} from "mobx";
import IProduct from "@/types/product/iProduct";
import {getProducts} from "@/features/productServices/getProducts";

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
                    this.setProduct(toJS(response.data.products));
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
}

export default new product;