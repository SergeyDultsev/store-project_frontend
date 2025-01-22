import styles from './btnApp.module.scss'

type propsBtn = {
    type: "button" | "submit" | "reset";
    text: string;
    onClick: () => void;
}

export default function BtnApp({ text, type, onClick }) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={styles['btn-default']}
        >{ text }</button>
    );
}