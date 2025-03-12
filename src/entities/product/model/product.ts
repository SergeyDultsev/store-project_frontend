import {action, makeAutoObservable, toJS} from "mobx";
import cart from '@/entities/cart/model/cart';
import {getProducts} from "@/features/product/get-product/getProducts";
import IProduct from "@/entities/product/model/types/iProduct";
import IResponse from "@/shared/types/iResponse";
import ICartProduct from "@/entities/cart/model/types/iCartProduct";

class product{
    productData: IProduct[] = [];
    productLastId: string | null = null;
    isLoading: boolean = false;
    hasMore: boolean = true;

    constructor() {
        makeAutoObservable(this, {
            getProducts: action,
            setProduct: action,
            compareCartAndProduct: action
        });
    }

    // Получение каталога с сервера
    async getProducts(): Promise<null|undefined>  {
        if (this.isLoading || !this.hasMore) return;
        this.isLoading = true;

        try {
            const response: IResponse<any> | null = await getProducts(this.productLastId);
            if (response && response.data) {
                const productsData = toJS(response.data.products);
                const lastId = toJS(response.data.next_page);

                this.hasMore = !!lastId;
                this.productLastId = lastId;
                this.compareCartAndProduct(productsData);
            }
        } catch (error) {
            return null;
        } finally {
            this.isLoading = false;
        }
    }

    // Сравнение корзины с каталогом для изменения состояния товара в каталоге
    compareCartAndProduct(products: IProduct[]): void {
        const cartData: ICartProduct[] = cart.cartData;
        const updatedProductData: IProduct[] = products.map((product: IProduct) => {
            const inCart: boolean = cartData.some(
                (productCart: ICartProduct): boolean => product.product_id === productCart.product_id
            );

            return { ...product, product_state: inCart ? 'in_cart' : product.product_state };
        });

        this.setProduct(updatedProductData);
    }

    // Добавление товаров в массив
    setProduct(products: IProduct[]): void {
        products.forEach((productItem: IProduct): void => {
            if (!this.productData.some(newProduct=> newProduct.product_id === productItem.product_id)) {
                this.productData.push(productItem);
            }
        });
    }
}

export default new product;