'use client'

import LoginForm from "@/widgets/login/loginForm";
import {useLayoutEffect} from "react";
import user from "@/entities/user/user";
import { useRouter } from "next/navigation";

export default function Auth() {
    const router = useRouter();

    useLayoutEffect(() => {
        const isAuth = user.isAuth;
        if(isAuth){
            router.replace("/")
        }
    }, [])

    return (
        <main>
            <LoginForm />
        </main>
    );
}