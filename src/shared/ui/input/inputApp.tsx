import styles from './inputApp.module.scss'

export default function inputApp({ type, placeholder }) {
    return (
        <input type={type} placeholder={placeholder} className={styles['input-default']}/>
    );
}