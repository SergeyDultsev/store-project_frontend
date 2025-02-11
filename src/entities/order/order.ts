import IOrderProduct from "@/types/order/iOrderProduct";
import {action, makeAutoObservable, toJS} from "mobx";
import {getOrders} from "@/features/orderServices/getOrders";

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
}

export default new order;