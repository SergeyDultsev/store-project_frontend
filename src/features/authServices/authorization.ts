import { ApiStore } from "@/shared/api/apiStore";
import ILoginRespones from "@/types/authTypes/loginResponse";

const API_URL : string = "";

export function authorization({ email, password }: { email: string; password: string }): Promise<ILoginRespones> {
    const response = ApiStore.useApi(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            "email": email,
            "password": password
        })
    });
    
    return response;
}