import React from "react";
import styles from '@/widgets/login/loginForm.module.scss'
import InputApp from '@/shared/ui/input/inputApp'
import ButtonApp from '@/shared/ui/button/btnApp'
import Link from "next/link";
import user from "@/entities/user/user";
import { observer } from 'mobx-react-lite';

const loginForm: React.FC =  observer(() => {
    const handleUserData = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        switch (name){
            case "email":
                user.setTempEmail(value);
                break;
            case "password":
                user.setTempPassword(value);
                break;
        }
    }

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await user.isAuthorization(user.tempEmail, user.tempPassword);
    }

    return (
        <form className={styles['form']} onSubmit={handleLogin}>
            <h2 className={styles['form__title']}>Авторизация</h2>

            <InputApp
                onChange={handleUserData}
                name="email"
                type="email"
                placeholder="Ваш Email"
                value={user?.tempEmail || ''}
            />
            <InputApp
                onChange={handleUserData}
                name="password"
                type="password"
                placeholder="Ваш пароль"
                value={user?.tempPassword || ''}
            />
            <ButtonApp
                text="Авторизоваться"
                type="submit"
            />
            <Link href="/register" className={styles['form__link']}>Зарегистрироваться</Link>
        </form>
    );
});

export default loginForm;