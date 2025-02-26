import ApiStore from "@/shared/api/apiStore";
import Cookies from "js-cookie";
import iCartProduct from "@/entities/cart/model/types/cart/iCartProduct";

export async function setOrders(order: iCartProduct[]){
    const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/order/`;
    return await ApiStore.useApi(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${Cookies.get('auth_token')}`,
        },
        body: JSON.stringify({ order }),
        credentials: 'include',
        mode: 'cors',
        cache: 'no-store',
    })
}