import {makeAutoObservable, runInAction, action} from "mobx";
import {authorization} from "@/features/auth/authorization/authorization";
import {registration} from "@/features/auth/register/registration";
import {logout} from "@/features/auth/logout/logout";
import {authCheck} from "@/features/auth/auth-check/authCheck";
import IResponse from "@/shared/types/iResponse";

class user {
    // Общие стейты
    id: string = "";
    name: string = "";
    email: string = "";
    isAuth: boolean = false;
    error: string = "";

    // Стейты формы авторизации
    authEmail:  string = "";
    authPassword:  string = "";

    // Стейты формы регистрации
    registerName: string = "";
    registerEmail:  string = "";
    registerPassword:  string = "";

    constructor() {
        makeAutoObservable(this, {
            setAuthUserData: action,
            setRegisterName: action,
            setRegisterEmail: action,
            setRegisterPassword: action,
            setAuthEmail: action,
            setAuthPassword: action,
            setErrorMessage: action,
            clearErrorMessage: action,
            clearAuthFormData: action,
            clearRegisterFormData: action,
            isAuthorization: action,
            isRegistration: action,
            isLogout: action,
        });
    }

    // Получение данных авторизованного пользователя
    setAuthUserData(data: {id: string, name: string, email: string}): void {
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
    }

    // Сеттеры для формы регистрации
    setRegisterName(name: string): void {
        this.registerName = name;
    }

    setRegisterEmail(email: string): void {
        this.registerEmail = email;
    }

    setRegisterPassword(name: string): void {
        this.registerPassword = name;
    }

    // Сеттеры для формы авторизации
    setAuthEmail(email: string): void{
        this.authEmail = email;
    }

    setAuthPassword(password: string): void{
        this.authPassword = password
    }

    // Общие функций
    setErrorMessage(message: string): void {
        this.error = message;
    }

    clearErrorMessage(): void {
        this.error = "";
    }

    clearAuthFormData(): void {
        this.authEmail = "";
        this.authPassword = "";
    }

    clearRegisterFormData(): void {
        this.registerName = "";
        this.registerEmail = "";
        this.registerPassword = "";
    }

    async isAuthorization(tempEmail: string, tempPassword: string): Promise<void> {
        const response: IResponse<any> | null = await authorization({ tempEmail, tempPassword });

        runInAction((): void => {
            if (response && response.status === 200) {
                this.isAuth = true;
                this.setAuthUserData({
                    id: response.data.id,
                    name: response.data.name,
                    email: response.data.email
                });
                this.clearErrorMessage();
                this.clearAuthFormData();
            } else {
                this.isAuth = false;
                this.clearAuthFormData();
                this.setErrorMessage("Error");
            }
        });
    }

    async isRegistration(tempName:string, tempEmail: string, tempPassword: string): Promise<void> {
        const response: IResponse<any> | null = await registration({ tempName, tempEmail, tempPassword });

        runInAction(() => {
            if(response && response.status === 201){
                this.clearRegisterFormData();
                this.clearErrorMessage();
            } else {
                this.clearRegisterFormData();
                this.setErrorMessage("Error");
            }
        });
    }

    async isLogout(): Promise<void> {
        const response: IResponse<any> | null = await logout();

        runInAction(() => {
            if(response && response.status === 200){
                this.isAuth = false;
                this.clearErrorMessage();
            } else {
                this.isAuth = false;
                this.setErrorMessage("Error");
            }
        });
    }

    async authorizationCheck(): Promise<void> {
        const response: IResponse<any> | null = await authCheck();

        runInAction(() => {
            if(response && response.status === 200){
                this.isAuth = response.data?.authorized === true;
                this.clearErrorMessage();
            } else {
                this.isAuth = false;
                this.setErrorMessage("Error");
            }
        });
    }
}

export default new user;