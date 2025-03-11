import ApiStore from "@/shared/api/apiStore";
import IResponse from "@/shared/types/iResponse";;

const API_URL : string = `${process.env.NEXT_PUBLIC_API_URL}/products`;

export function getProducts(lastId: string | null): Promise<IResponse<any>> {
    const url: string = lastId ? `${API_URL}?last_id=${lastId}` : API_URL;

    const response: Promise<IResponse<any|null>> = ApiStore.useApi(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        credentials: 'include',
        mode: 'cors',
    });

    return response;
}
