import { ApiStore } from "@/shared/api/apiStore";
import IRegisterResponse from "@/types/authTypes/registerRespones";

const API_URL : string = `${process.env.API_URL}/auth/register`;

export function registration({ name, email, password }: { name: string, email: string; password: string }): Promise<IRegisterResponse> {
    const response = ApiStore.useApi(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            "name": name,
            "email": email,
            "password": password
        })
    });
    
    return response;
}