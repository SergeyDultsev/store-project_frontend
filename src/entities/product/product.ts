import {makeAutoObservable} from "mobx";
import IProduct from "@/types/product/iProduct";

class product{
    productData: IProduct[] = [
        {id: '1', title: 'PC', price: 19999, state: 'available'},
        {id: '2', title: 'PC', price: 19999, state: 'in_cart'},
        {id: '3', title: 'PC', price: 19999, state: 'available'},
        {id: '4', title: 'PC', price: 19999, state: 'available'},
        {id: '5', title: 'PC', price: 19999, state: 'available'},
        {id: '6', title: 'PC', price: 19999, state: 'available'},
        {id: '7', title: 'PC', price: 19999, state: 'in_cart'},
        {id: '8', title: 'PC', price: 19999, state: 'available'},
        {id: '9', title: 'PC', price: 19999, state: 'available'},
        {id: '10', title: 'PC', price: 19999, state: 'available'},
    ];

    constructor() {
        makeAutoObservable(this);
    }

    changeStateProduct(productId: string){

    }
}

export default new product;