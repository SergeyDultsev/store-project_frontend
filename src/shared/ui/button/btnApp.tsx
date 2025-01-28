import React from "react";
import styles from './btnApp.module.scss'
import Image from "next/image";

type propsBtn = {
    img?: string;
    text?: string;
    type: "button" | "submit" | "reset";
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const BtnApp: React.FC<propsBtn> = ({ img, text, type, onClick }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={styles['btn-default']}
        >{img && <Image src={img} alt="btn icon" width={20} height={20}/>} { text }</button>
    );
}

export default BtnApp;