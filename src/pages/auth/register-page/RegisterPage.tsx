import {useLayoutEffect} from "react";
import {redirect} from "next/navigation";
import RegisterForm from "@/widgets/register-form/RegisterFrom";
import user from "@/entities/user/user";

export default function Register() {
    useLayoutEffect(() => {
        const isAuth = user.isAuth;
        if(isAuth){
            redirect("/")
        }
    }, [])

    return (
        <main>
            <RegisterForm></RegisterForm>
        </main>
    );
}
