import {action, makeAutoObservable, runInAction, toJS} from "mobx";
import product from "@/entities/product/model/product";
import {getCart} from "@/features/cart/get-cart/getCart";
import {deleteCartItem} from "@/features/cart/remove-cart/deleteCartItem";
import {setCartItem} from "@/features/cart/set-cart-item/setCartItem";
import {setQuantity} from "@/features/cart/set-cart-quantity/setQuantity";
import ICartProduct from "@/entities/cart/model/types/iCartProduct";
import IProduct from "@/entities/product/model/types/iProduct";
import IResponse from "@/shared/types/iResponse";

class Cart{
    cartData: ICartProduct[] = [];
    cartProductLastId: string | null = null;
    isLoading: boolean = false;
    hasMore: boolean = true;
    totalPrice: number = 0;
    countProducts: number = 0;

    constructor() {
        makeAutoObservable(this, {
            getCartProducts: action,
            setCart: action,
            setProductInCart: action,
            deleteProductInCart: action,
            getQuantityProduct: action,
            getTotalPrice: action,
            incrementQuantity: action,
            decrementQuantity: action,
            calculateCart: action,
            cleanCart: action
        });
    }

    // Получение корзины
    async getCartProducts(): Promise<void | null>{
        if (this.isLoading || !this.hasMore ) return;
        this.isLoading = false;

        try {
            if (this.cartData.length === 0) {
                const response: IResponse<any> | null = await getCart(this.cartProductLastId);
                if (response && response.data) {
                    const cartData = toJS(response.data.cart);
                    const lastId = toJS(response.data.next_page);

                    this.hasMore = !!lastId;
                    this.setCart(toJS(cartData), lastId);
                }
            }
        } catch (error) {
            return null;
        } finally {
            this.isLoading = false;
        }
    }

    // Добавление товара в корзину с сервера
    setCart(cart: ICartProduct[], lastId: string): void{
        runInAction((): void => {
            cart.forEach((cartItem: ICartProduct): void => {
                if (!this.cartData.some(newCartItem => newCartItem.product_id === cartItem.product_id)) {
                    this.cartData.push(cartItem);
                }
            });
            this.cartData = cart;
            this.calculateCart();
            this.cartProductLastId = lastId;
        });
    }

    // Добавление товара в корзину на сервер
    async setProductInCart(product: IProduct): Promise<void | null> {
        try {
            const response: IResponse<any> | null = await setCartItem(product.product_id);
            if (response && response.status === 201) {
                const newProduct: ICartProduct = response.data.product;

                this.cartData.push(newProduct);

                runInAction((): void => {
                    this.changeStateProduct(product.product_id);
                });
            }
        } catch (error) {
            return null;
        }
    }

    // Удаление товара из корзины
    async deleteProductInCart(cartId: string): Promise<void | null>{
        const cartItem: ICartProduct | undefined = this.cartData.find(
            (item: ICartProduct): boolean => item.cart_id === cartId
        );

        if(cartItem) {
            try {
                const response: IResponse <any> | null = await deleteCartItem(cartId);
                if(response && response.status === 200){
                    runInAction((): void => {
                        const idCart: number = this.cartData.indexOf(cartItem);
                        if (idCart !== -1) this.cartData.splice(idCart, 1);
                        this.changeStateProduct(cartItem.product_id);
                        this.calculateCart();
                    });
                }
            } catch (error) {
                return null;
            }
        }
    }

    // Изменение статуса продукта при добавлении/удалении из корзины
    changeStateProduct(productId: string): void {
        const productItem: IProduct | undefined = product.productData.find(
            (item: IProduct): boolean => item.product_id === productId
        );

        if (!productItem) return;

        productItem.product_state = productItem.product_state === 'in_cart' ? 'available' : 'in_cart';
    }


    // Получение общего кол-ва товаров в корзине
    getQuantityProduct(): number{
        return this.countProducts = this.cartData.reduce((count: number, cartItem: ICartProduct) =>
            count + cartItem.quantity, 0
        );
    }

    // Получение общей стоимости всех товаров в корзине
    getTotalPrice(): number{
        return this.totalPrice = Math.round(this.cartData.reduce((total: number, cartItem: ICartProduct) =>
            total + cartItem.product_price * cartItem.quantity, 0
        ) * 100) / 100;
    }

    // Увеличить кол-во товара в корзине
    async incrementQuantity(cartId: string): Promise<void> {
        const cartItem: ICartProduct | undefined = this.cartData.find(
            (item: ICartProduct): boolean => item.cart_id === cartId
        );

        if(cartItem){
            const response: IResponse <any> | null = await setQuantity(cartId, 1);
            if(response && response.status === 200){
                runInAction((): void => {
                    cartItem.quantity += 1;
                    this.calculateCart();
                })
            }
        }
    }

    // Уменьшить кол-во товара в корзине
    async decrementQuantity(cartId: string): Promise<void>{
        const cartItem: ICartProduct | undefined = this.cartData.find(
            (item: ICartProduct): boolean => item.cart_id === cartId
        );

        if (!cartItem) return;

        if(cartItem.quantity > 1) {
            const response: IResponse <any> | null = await setQuantity(cartId, -1);
            if (response && response.status === 200){
                runInAction((): void => {
                    cartItem.quantity -= 1;
                    this.calculateCart();
                })
            }
        } else {
            runInAction((): void => {
                this.deleteProductInCart(cartId);
                this.calculateCart();
            })
        }
    }

    // Подсчёт общего кол-ва товаров и общей стоимости
    calculateCart(): void{
        this.countProducts = this.getQuantityProduct();
        this.totalPrice = this.getTotalPrice();
    }

    // Обнуление корзины (после успешного запроса на сервер)
    cleanCart(): void {
        this.totalPrice = 0;
        this.countProducts = 0;

        this.cartData.forEach((product: ICartProduct): void => {
            this.resetStatus(product.product_id);
        })

        this.cartData = [];
    }

    // Сброс статуса после покупки
    resetStatus(productId: string): void{
        product.productData.forEach((item: IProduct): void => {
            if (productId === item.product_id) {
                item.product_state = 'available';
            }
        });
    }
}

export default new Cart;