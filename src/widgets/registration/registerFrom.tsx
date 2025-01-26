import styles from '@/widgets/registration/registerFrom.module.scss'
import InputApp from '@/shared/ui/input/inputApp'
import ButtonApp from '@/shared/ui/button/btnApp'
import Link from "next/link";
import user from "@/entities/user/user";
import React from "react";

export default function RegisterFrom() {

    const handleUserData = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        switch (name){
            case "name":
                user.setTempName(value);
                break;
            case "email":
                user.setTempEmail(value);
                break;
            case "password":
                user.setTempPassword(value);
                break;
        }
    }

    const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await user.isRegistration(user.tempName, user.tempEmail, user.tempPassword);
    }

    return (
        <form className={styles['form']} onSubmit={handleRegister}>
            <h2 className={styles['form__title']}>Регистрсация</h2>

            <InputApp
                onChange={handleUserData}
                name="name"
                type="text"
                placeholder="Ваше имя пользователя"
                value={user?.tempName || ''}
            />
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
                text="Зарегистрироваться"
                type={"submit"}
            />
            <Link href="/auth" className={styles['form__link']}>Уже зарегистрированы?</Link>
        </form>
    );
}