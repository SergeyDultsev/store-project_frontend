import styles from '@/widgets/auth/auth.module.scss'
import InputApp from '@/shared/ui/input/inputApp'
import ButtonApp from '@/shared/ui/button/btnApp'
import Link from "next/link";

export default function authForm() {
    return (
        <form className={styles['form']}>
            <h2 className={styles['form__title']}>Авторизация</h2>

            <InputApp type="email" placeholder="Ваш Email"/>
            <InputApp type="password" placeholder="Ваш пароль"/>
            <ButtonApp text="Авторизоваться"/>
            <Link href="/register" className={styles['form-link']}>Зарегистрироваться</Link>
        </form>
    )
}