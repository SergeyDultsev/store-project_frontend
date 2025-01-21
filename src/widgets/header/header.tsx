import styles from './header.module.scss';
import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return (
        <header className={styles['header']}>
            <nav className={styles['header__nav']}>
                <Link href="/" className={styles['header__nav-item']}>
                    <Image src="./img/icon/catalog.svg" alt="catalog" width={20} height={20} />
                    Каталог
                </Link>
                <Link href="/auth" className={styles['header__nav-item']}>
                    <Image src="./img/icon/exit.svg" alt="catalog" width={20} height={20} />
                    Авторизация
                </Link>
            </nav>
        </header>
    );
}