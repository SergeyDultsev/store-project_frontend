import {action, makeAutoObservable, runInAction} from "mobx";
import IResponse from "@/shared/types/iResponse";

class ApiStore<T = any> {
    data: IResponse<T> | null = null;
    loader: boolean = false;
    error: string = "";

    constructor() {
        makeAutoObservable(this, {
            useApi: action,
        });
    }

    async useApi(url: string, option: object): Promise<IResponse<T> | null> {
        this.loader = true;
        this.error = "";

        try{
            const response = await fetch(url, option);

            if (!response.ok) {
                this.error = `HTTP error! Status: ${response.status}`;
                return null as unknown as IResponse<T>;
            }

            const data: IResponse<T>  = await response.json();

            runInAction(() => {
                this.data = data;
            });

            return data;
        } catch (error) {
            runInAction(() => {
                if (error instanceof Error) {
                    this.error = error.message;
                }
            });

            return null;
        } finally {
            runInAction(() => {
                this.loader = false;
            });
        }
    }
}

export default new ApiStore;