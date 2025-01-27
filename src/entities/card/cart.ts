import {makeAutoObservable} from "mobx";
import IProduct from "@/types/product/iProduct";

class cart{
    cartData: IProduct[] = [
        {id: '2', title: 'PC', price: 19999, state: 'in_cart'},
        {id: '3', title: 'PC', price: 19999, state: 'in_cart'},
        {id: '4', title: 'PC', price: 19999, state: 'in_cart'},
    ];
}

export default new cart;