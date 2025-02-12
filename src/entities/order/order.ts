import IOrderProduct from "@/types/order/iOrderProduct";
import {action, makeAutoObservable, toJS} from "mobx";
import {getOrders} from "@/features/orderServices/getOrders";
import {setOrders} from "@/features/orderServices/setOrders";
import cart from "@/entities/cart/cart";

class order{
    orderData: IOrderProduct[] = [];

    constructor() {
        makeAutoObservable(this, {
            getOrders: action,
        });
    }

    async getOrders(){
        try{
            const response = await getOrders();
            if(response && response.data) this.orderData = response.data.order;
        } catch (error){
            return null;
        }
    }

    async setOrders() {
        try {
            if(cart.cartData.length !== 0) {
                const response = await setOrders(cart.cartData);
                if(response && response.data){
                    this.orderData = response.data.order;
                    cart.cleanCart();
                }
            }
        } catch (error) {
            return null;
        }
    }
}

export default new order;