import Link from 'next/link';
import stylesHeaderButton from './headerButton.module.css'

export type HeaderButtonProps = {
    children: string;
    href: string;
    icon: string;
}

export default function HeaderButton({children, href, icon}: HeaderButtonProps) {
    return (
        <Link className={stylesHeaderButton.headerButton} href={href}>
            <i className={`fa-solid fa-${icon}`}></i>
            <span className={stylesHeaderButton.headerButtonTitle}>⠀{children}</span>
        </Link>
    )
}