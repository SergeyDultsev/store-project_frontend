import {makeAutoObservable} from "mobx";

class ApiStore<T> {
    data: T | null = null;
    loader: boolean = false;
    error: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    async useApi(url: string, option: object): Promise<T> {
        this.loader = true;
        this.error = null;

        try{
            const response = await fetch(url, option);
            if (!response.ok) {
                this.error = `HTTP error! Status: ${response.status}`;
                return null as unknown as T;
            }
            const data: T = await response.json();
            this.data = data;
            return data;
        } catch (error) {
            if(error instanceof Error) this.error = error.message;
            return null as unknown as T;
        } finally {
            this.loader = false;
        }
    }
}

export default ApiStore;