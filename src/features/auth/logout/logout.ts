import ApiStore from "@/shared/api/apiStore";
import Cookies from "js-cookie";
import IResponse from "@/shared/types/iResponse";

const API_URL : string = `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`;

export async function logout(): Promise<IResponse<any> | null>  {
    const token: string | undefined = Cookies.get('auth_token');
    return await ApiStore.useApi(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        mode: 'cors',
        cache: 'no-store',
    });
}