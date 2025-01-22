import styles from '@/widgets/auth/auth.module.scss'
import InputApp from '@/shared/ui/input/inputApp'
import ButtonApp from '@/shared/ui/button/btnApp'
import Link from "next/link";

export default function registerForm() {
    return (
        <form className={styles['form']}>
            <h2 className={styles['form__title']}>Регистрсация</h2>

            <InputApp type="text" placeholder="Ваше имя пользователя"/>
            <InputApp type="email" placeholder="Ваш Email"/>
            <InputApp type="password" placeholder="Ваш пароль"/>
            <ButtonApp text="Зарегистрироваться"/>
            <Link href="/auth" className={styles['form-link']}>Уже зарегистрированы?</Link>
        </form>
    )
}