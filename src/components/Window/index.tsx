import stylesModuleWindow from './window.module.css'
import React, {MouseEventHandler} from "react";
import {Button} from "@/components";

export type WindowProps = {
    title?: any;
    children?: any;
    closeExecute: MouseEventHandler<HTMLButtonElement> | undefined;
}

export default function Window({children, title, closeExecute}: WindowProps) {

    return (
        <section className={`${stylesModuleWindow.moduleWindowHolder}`}>
            <div className={stylesModuleWindow.moduleWindow}>
                <div className={stylesModuleWindow.moduleWindowHeader}>
                    <p id="module-window-title">{title}</p>
                </div>
                <div className={stylesModuleWindow.moduleWindowContent}>
                    <p id="module-window-message">{children}</p>
                </div>
                <div className={stylesModuleWindow.moduleWindowFooter}>
                    <Button icon="xmark" type="button" execute={closeExecute}>Закрыть</Button>
                </div>
            </div>
        </section>
    )
}