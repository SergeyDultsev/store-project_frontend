import React from "react";
import styles from './btnApp.module.scss'
import Image from "next/image";

type propsBtn = {
    text?: string;
    type: "button" | "submit" | "reset";
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