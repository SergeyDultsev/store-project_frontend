import {makeAutoObservable} from "mobx";
import ICartProduct from "@/types/cart/iCartProduct";
import IProduct from "@/types/product/iProduct";

class cart{
    cartData: ICartProduct[] = [];

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
    }

    /*
        Удаление товара из корзины
    */
    deleteProductInCart(productID: string){
        const productItem = this.cartData.find((item) => item.id === productID);
        if(productItem) {
            const idProduct = this.cartData.indexOf(productItem);
            if(idProduct != -1) this.cartData.splice(idProduct, 1);
        }
    }

    /*
        Получение общего кол-ва товаров в корзине
    */
    getQuantityProduct(): number{
        let allProductInCard: number = 0;
        this.cartData.forEach((cartItem) => {
            allProductInCard += cartItem.quantity;
        })

        return allProductInCard
    }

    /*
        Получение общей стоимости всех товаров в корзине
    */
    getTotalPrice(): number{
        let totalPrice: number = 0;
        this.cartData.forEach((cartItem) => {
            totalPrice += cartItem.price;
        })

        return totalPrice
    }

    /*
        Увеличить кол-во товара в корзине
    */
    incrementQuantity(productID: string): void{
        const productItem = this.cartData.find((item) => item.id === productID);
        productItem.quantity += 1;
    }

    /*
        Уменьшить кол-во товара в корзине
    */
    decrementQuantity(productID: string): void{
        const productItem = this.cartData.find((item) => item.id === productID);

        if(productItem.quantity > 0) {
            productItem.quantity -= 1;
        } else {
            this.deleteProductInCart(productItem.id);
        }
    }
}

export default new cart;