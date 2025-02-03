import ApiStore from "@/shared/api/apiStore";

const API_URL : string = `${process.env.NEXT_PUBLIC_API_URL}/auth/check`;

export function authCheck() {
    const response = ApiStore.useApi(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        credentials: 'include',
        mode: 'cors',
        cache: 'no-store',
    });

    return response;
}