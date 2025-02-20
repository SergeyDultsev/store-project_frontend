import {makeAutoObservable, runInAction, action} from "mobx";
import {authorization} from "@/features/authServices/authorization";
import {registration} from "@/features/authServices/registration";
import {logout} from "@/features/authServices/logout";
import {authCheck} from "@/features/authServices/authCheck";
import { useRouter } from 'next/router';

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
    setAuthUserData(data: {id: string, name: string, email: string}) {
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
    }

    // Сеттеры для формы регистрации
    setRegisterName(name: string) {
        this.registerName = name;
    }

    setRegisterEmail(email: string) {
        this.registerEmail = email;
    }

    setRegisterPassword(name: string) {
        this.registerPassword = name;
    }

    // Сеттеры для формы авторизации
    setAuthEmail(email: string){
        this.authEmail = email;
    }

    setAuthPassword(password: string){
        this.authPassword = password
    }

    // Общие функций
    setErrorMessage(message: string) {
        this.error = message;
    }

    clearErrorMessage() {
        this.error = "";
    }

    clearAuthFormData() {
        this.authEmail = "";
        this.authPassword = "";
    }

    clearRegisterFormData() {
        this.registerName = "";
        this.registerEmail = "";
        this.registerPassword = "";
    }

    async isAuthorization(tempEmail: string, tempPassword: string): Promise<void> {
        const router = useRouter();
        const response = await authorization({ tempEmail, tempPassword });

        runInAction(() => {
            if (response && response.status === 200) {
                this.isAuth = true;
                this.setAuthUserData({
                    id: response.data.id,
                    name: response.data.name,
                    email: response.data.email
                });
                this.clearErrorMessage();
                this.clearAuthFormData();
                router.replace('/');
            } else {
                this.isAuth = false;
                this.clearAuthFormData();
                this.setErrorMessage("Error");
            }
        });
    }

    async isRegistration(tempName:string, tempEmail: string, tempPassword: string): Promise<void> {
        const response = await registration({ tempName, tempEmail, tempPassword });

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
        const response = await logout();

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
        const response = await authCheck();

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