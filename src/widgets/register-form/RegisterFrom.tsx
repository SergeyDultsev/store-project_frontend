import styles from '@/widgets/register-form/RegisterFrom.module.scss'
import InputApp from '@/shared/ui/input/inputApp'
import ButtonApp from '@/shared/ui/button/btnApp'
import Link from "next/link";
import user from "@/entities/user/user";
import React from "react";
import {observer} from "mobx-react-lite";

const RegisterFrom: React.FC = observer(() => {
    const handleUserData = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        switch (name){
            case "name":
                user.setRegisterName(value);
                break;
            case "email":
                user.setRegisterEmail(value);
                break;
            case "password":
                user.setRegisterPassword(value);
                break;
        }
    }

    const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await user.isRegistration(user.registerName, user.registerEmail, user.registerPassword);
    }

    return (
        <form className={styles['form']} onSubmit={handleRegister}>
            <h2 className={styles['form__title']}>Регистрсация</h2>

            <InputApp
                onChange={handleUserData}
                name="name"
                type="text"
                placeholder="Ваше имя пользователя"
                value={user?.registerName || ''}
            />
            <InputApp
                onChange={handleUserData}
                name="email"
                type="email"
                placeholder="Ваш Email"
                value={user?.registerEmail || ''}
            />
            <InputApp
                onChange={handleUserData}
                name="password"
                type="password"
                placeholder="Ваш пароль"
                value={user?.registerPassword || ''}
            />
            <ButtonApp
                text="Зарегистрироваться"
                type={"submit"}
            />
            <Link href="/login" className={styles['form__link']}>Уже зарегистрированы?</Link>
        </form>
    );
});

export default RegisterFrom;