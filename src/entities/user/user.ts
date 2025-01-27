import {makeAutoObservable} from "mobx";
import {authorization} from "@/features/authServices/authorization";
import {registration} from "@/features/authServices/registration";

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
        makeAutoObservable(this);
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
        const response = await authorization({ tempEmail, tempPassword });

        if (response && response.data) {
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
            this.setErrorMessage("Ошибка авторизации. Проверьте данные");
        }
    }

    async isRegistration(tempName:string, tempEmail: string, tempPassword: string): Promise<void> {
        const response = await registration({ tempName, tempEmail, tempPassword });

        if(response && response.data){
            this.clearRegisterFormData();
            this.clearErrorMessage();
        } else {
            this.clearRegisterFormData();
            this.setErrorMessage("Ошибка регистрации. Проверьте данные");
        }
    }

}

export default new user;