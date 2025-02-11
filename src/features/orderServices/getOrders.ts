import ApiStore from "@/shared/api/apiStore";
import Cookies from "js-cookie";

export async function getOrders(){
    const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/order`;
    return await ApiStore.useApi(API_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${Cookies.get('auth_token')}`,
        },
        credentials: 'include',
        mode: 'cors',
        cache: 'no-store',
    })
}