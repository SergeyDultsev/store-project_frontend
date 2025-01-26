import React from "react";
import styles from './inputApp.module.scss'

type propsInput = {
    name: string;
    type: "text" | "textarea" | "email" | "password",
    placeholder: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputApp: React.FC<propsInput> =
    ({name, type, placeholder, value, onChange}) => {
    return (
        <input
            className={styles['input-default']}
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    );
}

export default InputApp;