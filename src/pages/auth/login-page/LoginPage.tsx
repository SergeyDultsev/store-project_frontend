import {useLayoutEffect} from "react";
import { useRouter } from "next/navigation";
import LoginForm from "@/widgets/login-form/LoginForm";
import user from "@/entities/user/user";

export default function Login() {
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