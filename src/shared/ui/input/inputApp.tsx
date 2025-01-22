import styles from './inputApp.module.scss'

type propsInput = {
    type: "text" | "textarea" | "email" | "password",
    placeholder: string;
}

export default function InputApp({ type, placeholder }) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            className={styles['input-default']}/>
    );
}