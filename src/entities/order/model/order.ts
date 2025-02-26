import IOrderProduct from "@/entities/order/model/types/order/iOrderProduct";
import {action, makeAutoObservable, toJS} from "mobx";
import {getOrders} from "@/features/orderServices/getOrders";
import {setOrders} from "@/features/orderServices/setOrders";
import cart from "@/entities/cart/model/cart";
import IResponse from "@/shared/types/iResponse";

class order{
    orderData: IOrderProduct[] = [];

    constructor() {
        makeAutoObservable(this, {
            getOrders: action,
        });
    }

    async getOrders(): Promise<null|undefined>{
        try{
            const response: IResponse<any> | null = await getOrders();
            if(response && response.data) this.orderData = response.data.order;
        } catch (error){
            return null;
        }
    }

    async setOrders(): Promise<null|undefined> {
        try {
            if(cart.cartData.length !== 0) {
                const response: IResponse<any> | null = await setOrders(cart.cartData);
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