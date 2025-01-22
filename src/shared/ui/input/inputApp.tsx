import styles from './inputApp.module.scss'

export default function InputApp({ type, placeholder }) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            className={styles['input-default']}/>
    );
}