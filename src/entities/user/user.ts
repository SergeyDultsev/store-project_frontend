import {makeAutoObservable} from "mobx";
import {authorization} from "@/features/authServices/authorization";
import {registration} from "@/features/authServices/registration";

class user {
    id: string = "";
    name: string = "";
    email: string = "";
    isAuth: boolean = false;
    error: string = "";

    // Данные формы авторизации или регистрации
    tempName: string = "";
    tempEmail:  string = "";
    tempPassword:  string = "";

    constructor() {
        makeAutoObservable(this);
    }

    setUserData(data: {id: string, name: string, email: string}) {
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
    }

    setTempName(name: string) {
        this.tempName = name;
    }

    setTempEmail(email: string){
        this.tempEmail = email;
    }

    setTempPassword(password: string){
        this.tempPassword = password
    }

    setErrorMessage(message: string) {
        this.error = message;
    }

    clearErrorMessage() {
        this.error = "";
    }

    clearTempData() {
        this.tempName = "";
        this.tempEmail = "";
        this.tempPassword = "";
    }

    async isAuthorization(tempEmail: string, tempPassword: string): Promise<void> {
        const response = await authorization({ tempEmail, tempPassword });

        if (response && response.data) {
            this.isAuth = true;
            this.setUserData({
                id: response.data.id,
                name: response.data.name,
                email: response.data.email
            });
            this.clearErrorMessage();
            this.clearTempData();
        } else {
            this.isAuth = false;
            this.clearTempData();
            this.setErrorMessage("Ошибка авторизации. Проверьте данные");
        }
    }

    async isRegistration(tempName:string, tempEmail: string, tempPassword: string): Promise<void> {
        const response = await registration({ tempName, tempEmail, tempPassword });
        response && response.data ? this.clearErrorMessage() : this.setErrorMessage("Ошибка регистрации. Проверьте данные");
    }

}

export default new user;