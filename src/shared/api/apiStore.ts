import {makeAutoObservable} from "mobx";
import IResponse from "@/types/shared/iResponse";

class ApiStore<T = any> {
    data: IResponse<T> | null = null;
    loader: boolean = false;
    error: string = "";

    constructor() {
        makeAutoObservable(this);
    }

    async useApi(url: string, option: object): Promise<IResponse<T>> {
        this.loader = true;
        this.error = "";

        try{
            const response = await fetch(url, option);
            if (!response.ok) {
                this.error = `HTTP error! Status: ${response.status}`;
                return null as unknown as IResponse<T>;
            }
            const data: IResponse<T>  = await response.json();
            this.data = data;
            return data;
        } catch (error) {
            if(error instanceof Error) this.error = error.message;
            return null as unknown as IResponse<T>;
        } finally {
            this.loader = false;
        }
    }
}

export default new ApiStore;