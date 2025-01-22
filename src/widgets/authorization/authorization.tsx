import styles from '@/widgets/authorization/authorization.module.scss'
import InputApp from '@/shared/ui/input/inputApp'
import ButtonApp from '@/shared/ui/button/btnApp'
import Link from "next/link";

export default function Authorization() {
    return (
        <form className={styles['form']}>
            <h2 className={styles['form__title']}>Авторизация</h2>

            <InputApp type="email" placeholder="Ваш Email"/>
            <InputApp type="password" placeholder="Ваш пароль"/>
            <ButtonApp text="Авторизоваться" type={"submit"}/>
            <Link href="/register" className={styles['form__link']}>Зарегистрироваться</Link>
        </form>
    )
}