import stylesButton from './button.module.css'
import {MouseEventHandler} from "react";

export type ButtonProps = {
    children?: string;
    type?: "button" | "submit" | "reset" | undefined;
    execute?: MouseEventHandler<HTMLButtonElement> | undefined;
    icon: string;
    iconGroup?: string;
}

export default function Button({children, type, icon = "submit", iconGroup = "solid", execute}: ButtonProps) {
    return (
        <button className={stylesButton.button} type={type} onClick={execute}>
            <i className={`fa-${iconGroup} fa-${icon}`}></i>
            <span>{children ? `⠀${children}` : ""} </span>
        </button>
    )
}