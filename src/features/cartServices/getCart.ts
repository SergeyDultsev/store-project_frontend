import ApiStore from "@/shared/api/apiStore";
import Cookies from "js-cookie";

const API_URL : string = `${process.env.NEXT_PUBLIC_API_URL}/cart`;

export async function getCart() {
    const token: string | undefined = Cookies.get('auth_token');
    return await ApiStore.useApi(API_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        mode: 'cors',
        cache: 'no-store',
    })
}
