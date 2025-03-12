import ApiStore from "@/shared/api/apiStore";
import Cookies from "js-cookie";
import IResponse from "@/shared/types/iResponse";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/order`;

export async function getOrders(lastId: string | null): Promise<IResponse<any> | null> {
    const url: string = lastId ? `${API_URL}/${lastId}` : API_URL;

    return await ApiStore.useApi(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${Cookies.get('auth_token')}`,
        },
        credentials: 'include',
        mode: 'cors',
        cache: 'no-store',
    });
}