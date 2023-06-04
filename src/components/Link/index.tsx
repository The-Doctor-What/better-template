import Link from 'next/link';
import stylesLink from './link.module.css'

export type LinkProps = {
    children?: string;
    href: string;
    icon: string;

    iconGroup?: string;
}

export default function HeaderButton({children, href, icon, iconGroup = "solid" }: LinkProps) {
    return (
        <Link className={stylesLink.linkButton} href={href}>
            <i className={`fa-${iconGroup} fa-${icon}`}></i>
            <span>{children ? `⠀${children}` : ""} </span>
        </Link>
    )
}