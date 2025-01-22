import styles from './btnApp.module.scss'

export default function BtnApp({ text, type, onClick, className = "", ...rest }) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={styles['btn-default']}
            {...rest}
        >{ text }</button>
    );
}