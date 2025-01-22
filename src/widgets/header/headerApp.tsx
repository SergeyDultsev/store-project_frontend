import styles from './headerApp.module.scss';
import Image from "next/image";
import Link from "next/link";

export default function HeaderApp() {
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