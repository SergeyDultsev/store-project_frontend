import IOrderProduct from "@/entities/order/model/types/iOrderProduct";
import {action, makeAutoObservable, toJS} from "mobx";
import {getOrders} from "@/features/order/get-order/getOrders";
import {setOrders} from "@/features/order/set-order/setOrders";
import cart from "@/entities/cart/model/cart";
import IResponse from "@/shared/types/iResponse";

class order{
    orderData: IOrderProduct[] = [];
    orderProductLastId: string | null = null;
    isLoading: boolean = false;
    hasMore: boolean = true;

    constructor() {
        makeAutoObservable(this, {
            getOrders: action,
            setOrders: action
        });
    }

    // Получение заказа
    async getOrders(): Promise<null|undefined>{
        try{
            const response: IResponse<any> | null = await getOrders(this.orderProductLastId);
            if(response && response.data) {
                const orderData = toJS(response.data.order);
                const lastId = toJS(response.data.next_page);
                this.orderData = orderData;

                this.hasMore = !!lastId;
                this.orderProductLastId = toJS(response.data.next_page);
            }
        } catch (error){
            return null;
        } finally {
            this.isLoading = false;
        }
    }

    // Оформление заказа
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

    // Обнуление заказов
    cleanOrder(): void {
        this.orderData = [];
    }
}

export default new order;