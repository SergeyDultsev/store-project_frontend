import styles from '@/widgets/registration/registration.module.scss'
import InputApp from '@/shared/ui/input/inputApp'
import ButtonApp from '@/shared/ui/button/btnApp'
import Link from "next/link";

export default function Registration() {
    return (
        <form className={styles['form']}>
            <h2 className={styles['form__title']}>Регистрсация</h2>

            <InputApp type="text" placeholder="Ваше имя пользователя"/>
            <InputApp type="email" placeholder="Ваш Email"/>
            <InputApp type="password" placeholder="Ваш пароль"/>

            <ButtonApp text="Зарегистрироваться" type={"submit"}/>
            <Link href="/auth" className={styles['form__link']}>Уже зарегистрированы?</Link>
        </form>
    )
}