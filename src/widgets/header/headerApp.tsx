'use client'

import styles from './headerApp.module.scss';
import Image from "next/image";
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
                        <Image src="./img/icon/catalog.svg" alt="catalog" width={20} height={20}/>
                        Каталог
                    </Link>
                    <Link href="/profile" className={styles['header__nav-item']}>
                        <Image src="./img/icon/profile.svg" alt="profile" width={20} height={20}/>
                        Личный кабинет
                    </Link>
                    <Link href="/cart" className={styles['header__nav-item']}>
                        <Image src="./img/icon/cart.svg" alt="cart" width={20} height={20}/>
                        Корзина
                    </Link>
                    <Link href="/" onClick={handleLogout} className={styles['header__nav-item']}>
                        <Image src="./img/icon/exit.svg" alt="catalog" width={20} height={20}/>
                        Выход
                    </Link>
                </nav>
            ) : (
                <nav className={styles['header__nav']}>
                    <Link href="/" className={styles['header__nav-item']}>
                        <Image src="./img/icon/catalog.svg" alt="catalog" width={20} height={20}/>
                        Каталог
                    </Link>
                    <Link href="/auth" className={styles['header__nav-item']}>
                        <Image src="./img/icon/exit.svg" alt="catalog" width={20} height={20}/>
                        Авторизация
                    </Link>
                </nav>
            )}
        </header>
    );
});

export default HeaderApp;