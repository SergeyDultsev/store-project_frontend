import ApiStore from "@/shared/api/apiStore";

const API_URL : string = `${process.env.NEXT_PUBLIC_API_URL}/auth/check`;

export async function authCheck() {
    try {
        const response = await ApiStore.useApi(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            credentials: 'include',
            mode: 'cors',
            cache: 'no-store',
        });

        console.log("API ответ:", response);

        return response;
    } catch (error) {
        console.error("Ошибка при запросе к API:", error);
        return null;
    }
}