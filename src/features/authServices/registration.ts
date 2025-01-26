import ApiStore from "@/shared/api/apiStore";

const API_URL : string = `${process.env.NEXT_PUBLIC_API_URL}/auth/register`;

export function registration({ tempName, tempEmail, tempPassword }: { tempName: string, tempEmail: string; tempPassword: string }) {
    const response = ApiStore.useApi(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            "name": tempName,
            "email": tempEmail,
            "password": tempPassword
        }),
        credentials: 'include',
    });
    
    return response;
}