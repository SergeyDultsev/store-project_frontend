import ApiStore from "@/shared/api/apiStore";

const API_URL : string = `${process.env.NEXT_PUBLIC_API_URL}/auth/login`;

export function authorization({ tempEmail, tempPassword }: { tempEmail: string; tempPassword: string }) {
    const response = ApiStore.useApi(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            "email": tempEmail,
            "password": tempPassword
        }),
        credentials: 'include',
    });

    return response;
}