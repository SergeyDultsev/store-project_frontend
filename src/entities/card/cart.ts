import {makeAutoObservable} from "mobx";
import ICartProduct from "@/types/cart/iCartProduct";
import IProduct from "@/types/product/iProduct";
import product from "@/entities/product/product";
import cartItem from "@/entities/card/components/cart-item/cartItem";

class cart{
    cartData: ICartProduct[] = [];
    totalPrice: number = 0;
    countProducts: number = 0;

    constructor() {
        makeAutoObservable(this);
    }

    /*
        Добавление товара в корзину
    */
    setProductInCart(productData: IProduct): void{
        const tempCartProduct: ICartProduct = {
            id: productData.id,
            title: productData.title,
            price: productData.price,
            state: "in_cart",
            quantity: 1
        }

        this.cartData.push(tempCartProduct);
        product.changeStateProduct(productData.id);
        this.getQuantityProduct();
        this.getTotalPrice();
    }

    /*
        Удаление товара из корзины
    */
    deleteProductInCart(productID: string){
        const productItem = this.cartData.find((item) => item.id === productID);
        if(productItem) {
            const idProduct = this.cartData.indexOf(productItem);
            if(idProduct != -1) this.cartData.splice(idProduct, 1);
            product.changeStateProduct(productItem.id);
            this.getQuantityProduct();
            this.getTotalPrice();
        }
    }

    /*
        Получение общего кол-ва товаров в корзине
    */
    getQuantityProduct(): void{
        this.countProducts = this.cartData.reduce((count, cartItem) =>
            count + cartItem.quantity, 0
        );
    }

    /*
        Получение общей стоимости всех товаров в корзине
    */
    getTotalPrice(): void{
        this.totalPrice = this.cartData.reduce((total, cartItem) =>
            total + cartItem.price * cartItem.quantity, 0
        );
    }

    /*
        Увеличить кол-во товара в корзине
    */
    incrementQuantity(productID: string): void{
        const productItem = this.cartData.find((item) => item.id === productID);
        productItem.quantity += 1;
        this.getQuantityProduct();
        this.getTotalPrice();
    }

    /*
        Уменьшить кол-во товара в корзине
    */
    decrementQuantity(productID: string): void{
        const productItem = this.cartData.find((item) => item.id === productID);

        if(productItem.quantity > 1) {
            productItem.quantity -= 1;
        } else {
            this.deleteProductInCart(productItem.id);
        }

        this.getQuantityProduct();
        this.getTotalPrice();
    }
}

export default new cart;