'use client'

import LoginForm from "@/widgets/login/loginForm";
import {useLayoutEffect} from "react";
import {redirect} from "next/navigation";
import user from "@/entities/user/user";

export default function Auth() {
    useLayoutEffect(() => {
        const isAuth = user.isAuth;
        if(isAuth){
            redirect("/")
        }
    }, [])

    return (
        <main>
            <LoginForm />
        </main>
    );
}