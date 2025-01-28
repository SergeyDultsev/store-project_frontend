import {makeAutoObservable} from "mobx";
import ICartProduct from "@/types/cart/iCartProduct";
import IProduct from "@/types/product/iProduct";

class cart{
    cartData: ICartProduct[] = [{id: '1', title: 'PC', price: 19999, state: 'in_cart', quantity: 1},
        {id: '2', title: 'PC', price: 1999, state: 'in_cart', quantity: 2},
        {id: '3', title: 'PC', price: 25999, state: 'in_cart', quantity: 3},];

    constructor() {
        makeAutoObservable(this);
    }

    setProductInCart(productData: IProduct){
        const tempCartProduct: ICartProduct = {
            id: productData.id,
            title: productData.title,
            price: productData.price,
            state: "in_cart",
            quantity: 1
        }

        this.cartData.push(tempCartProduct);
    }

    handleProductInCart(productID: string){
        const productItem = this.cartData.find((item) => item.id === productID);
        if(productItem) {
            const idProduct = this.cartData.indexOf(productItem);
            if(idProduct != -1) this.cartData.splice(idProduct, 1);
        }
    }

    getQuantityProduct(): number{
        let allProductInCard: number = 0;
        this.cartData.forEach((cartItem) => {
            allProductInCard += cartItem.quantity;
        })

        return allProductInCard
    }

    getTotalPrice(): number{
        let totalPrice: number = 0;
        this.cartData.forEach((cartItem) => {
            totalPrice += cartItem.price;
        })

        return totalPrice
    }
}

export default new cart;