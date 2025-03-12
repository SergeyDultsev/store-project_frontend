import ApiStore from "@/shared/api/apiStore";
import Cookies from "js-cookie";
import iCartProduct from "@/entities/cart/model/types/iCartProduct";
import IResponse from "@/shared/types/iResponse";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/order/`;

export async function setOrders(order: iCartProduct[]): Promise<IResponse<any> | null>  {
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