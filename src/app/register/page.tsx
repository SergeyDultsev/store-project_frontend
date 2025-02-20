'use client'

import RegisterForm from "@/widgets/registration/registerFrom";
import {useLayoutEffect} from "react";
import user from "@/entities/user/user";
import {redirect} from "next/navigation";

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
