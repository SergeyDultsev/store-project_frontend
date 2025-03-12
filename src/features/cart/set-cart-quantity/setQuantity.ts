import Cookies from "js-cookie";
import ApiStore from "@/shared/api/apiStore";
import IResponse from "@/shared/types/iResponse";

export async function setQuantity(cartId: string, quantity: number): Promise<IResponse<any> | null> {
    const API_URL : string = `${process.env.NEXT_PUBLIC_API_URL}/cart/${cartId}`;
    const token: string | undefined = Cookies.get('auth_token');

    return await ApiStore.useApi(API_URL, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            quantity: quantity
        }),
        credentials: 'include',
        mode: 'cors',
        cache: 'no-store',
    })
}