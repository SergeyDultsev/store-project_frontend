import styles from './btnApp.module.scss'

export default function btnApp({ text }) {
    return (
        <button className={styles['btn-default']}>{ text }</button>
    );
}