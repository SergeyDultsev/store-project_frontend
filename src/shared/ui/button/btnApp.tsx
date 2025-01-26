import React from "react";
import styles from './btnApp.module.scss'

type propsBtn = {
    type: "button" | "submit" | "reset";
    text: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const BtnApp: React.FC<propsBtn> = ({ text, type, onClick }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={styles['btn-default']}
        >{ text }</button>
    );
}

export default BtnApp;