import ApiStore from "@/shared/api/apiStore";
import IResponse from "@/shared/types/iResponse";;

const API_URL : string = `${process.env.NEXT_PUBLIC_API_URL}/products`;

export async function getProducts(lastId: string | null): Promise<IResponse<any> | null> {
    const url: string = lastId ? `${API_URL}/${lastId}` : API_URL;

    return await ApiStore.useApi(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        credentials: 'include',
        mode: 'cors',
    })
}
