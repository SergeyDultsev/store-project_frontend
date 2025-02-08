import ApiStore from "@/shared/api/apiStore";

const API_URL : string = `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`;

export async function logout() {
    return await ApiStore.useApi(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        credentials: 'include',
        mode: 'cors',
        cache: 'no-store',
    });;
}