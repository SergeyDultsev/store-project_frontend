import {makeAutoObservable, runInAction, toJS} from "mobx";
import ICartProduct from "@/types/cart/iCartProduct";
import product from "@/entities/product/product";
import {getCart} from "@/features/cartServices/getCart";
import {deleteCartItem} from "@/features/cartServices/deleteCartItem";
import {setCartItem} from "@/features/cartServices/setCartItem";
import {setQuantity} from "@/features/cartServices/setQuantity";

class cart{
    cartData: ICartProduct[] = [];
    totalPrice: number = 0;
    countProducts: number = 0;

    constructor() {
        makeAutoObservable(this);
    }

    /*
        Получение корзины
     */
    async getCartProducts(){
        try {
            if (this.cartData.length === 0) {
                const response = await getCart();
                if (response && response.data) {
                    this.setCart(toJS(response.data.cart));
                }
            }
        } catch (error) {
            return null;
        }
    }

    /*
        Добавление товаров к корзину
     */
    setCart(products: ICartProduct[]){
        runInAction(() => {
            this.cartData = products;
            this.calculateCart();
        });
    }

    /*
        Добавление товара в корзину
    */
    async setProductInCart(cartItem: ICartProduct) {
        try {
            const response = await setCartItem(cartItem.product_id);
            if(response && response.status === 201){
                const newProduct: ICartProduct = response.data.product;

                this.cartData.push(newProduct);

                runInAction(() => {
                    product.changeStateProduct(cartItem.product_id);
                });
            }
        } catch (error) {
            return null;
        }
    }

    /*
        Удаление товара из корзины
    */
    async deleteProductInCart(cartId: string){
        const cartItem = this.cartData.find((item: ICartProduct) => item.cart_id === cartId);
        if(cartItem) {
            try {
                const response = await deleteCartItem(cartId);
                if(response && response.status === 200){
                    runInAction(() => {  // Обернул в runInAction
                        const idCart = this.cartData.indexOf(cartItem);
                        if (idCart !== -1) this.cartData.splice(idCart, 1);
                        product.changeStateProduct(cartItem.product_id);
                        this.calculateCart();
                    });
                }
            } catch (error) {
                return null;
            }
        }
    }

    /*
        Получение общего кол-ва товаров в корзине
    */
    getQuantityProduct(): number{
        return this.countProducts = this.cartData.reduce((count: number, cartItem: ICartProduct) =>
            count + cartItem.quantity, 0
        );
    }

    /*
        Получение общей стоимости всех товаров в корзине
    */
    getTotalPrice(): number{
        return this.totalPrice = Math.round(this.cartData.reduce((total: number, cartItem: ICartProduct) =>
            total + cartItem.product_price * cartItem.quantity, 0
        ) * 100) / 100;
    }

    /*
        Увеличить кол-во товара в корзине
    */
    async incrementQuantity(cartId: string){
        const cartItem = this.cartData.find((item: ICartProduct) => item.cart_id === cartId);

        if(cartItem){
            const response = await setQuantity(cartId, 1);
            if(response && response.status === 200){
                cartItem.quantity += 1;
                this.calculateCart();
            }
        }
    }

    /*
        Уменьшить кол-во товара в корзине
    */
    async decrementQuantity(cartId: string){
        const cartItem: ICartProduct = this.cartData.find((item: ICartProduct) => item.cart_id === cartId);

        if(cartItem.quantity > 1) {
            const response = await setQuantity(cartId, -1);
            if (response && response.status === 200){
                cartItem.quantity -= 1;
                this.calculateCart();
            }
        } else {
            this.deleteProductInCart(cartId);
        }

        this.calculateCart();
    }

    /*
        Подсчёт общего кол-ва товаров и общей стоимости
    */
    calculateCart(){
        this.countProducts = this.getQuantityProduct();
        this.totalPrice = this.getTotalPrice();
    }

    /*
        Обнуление корзины
     */
    cleanCart() {
        this.totalPrice = 0;
        this.countProducts= 0;

        this.cartData.forEach((item: ICartProduct) => {
            this.deleteProductInCart(item.cart_id);
        })

        this.cartData = [];
    }
}

export default new cart;