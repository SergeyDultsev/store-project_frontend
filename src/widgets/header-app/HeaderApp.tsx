'use client'

import styles from './HeaderApp.module.scss';
import Link from "next/link";
import user from '@/entities/user/user';
import {observer} from "mobx-react-lite";
import {useRouter} from "next/navigation";

const HeaderApp: React.FC = observer(() => {
    const router = useRouter();

    const handleLogout = (event: MouseEvent) => {
        event.preventDefault();
        user.isLogout();
        router.push("/");
    }

    return (
        <header className={styles['header']}>
            {user.isAuth ? (
                <nav className={styles['header__nav']}>
                    <Link href="/" className={styles['header__nav-item']}>
                        Каталог
                    </Link>
                    <Link href="/profile" className={styles['header__nav-item']}>
                        Личный кабинет
                    </Link>
                    <Link href="/cart" className={styles['header__nav-item']}>
                        Корзина
                    </Link>
                    <Link href="/" onClick={handleLogout} className={styles['header__nav-item']}>
                        Выход
                    </Link>
                </nav>
            ) : (
                <nav className={styles['header__nav']}>
                    <Link href="/" className={styles['header__nav-item']}>
                        Каталог
                    </Link>
                    <Link href="/login" className={styles['header__nav-item']}>
                        Авторизация
                    </Link>
                </nav>
            )}
        </header>
    );
});

export default HeaderApp;