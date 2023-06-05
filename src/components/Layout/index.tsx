import Head from 'next/head'
import stylesHeader from './header.module.css'
import React from "react";
import {HeaderButton} from "@/components";

export type LayoutProps = {
    title?: string;
    children?: React.ReactNode;
    className?: string;
}

export default function Layout({children, title, className}: LayoutProps) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://example.com";
    const meta = {
        url: baseUrl,
        title: (title ? title + " | " : "") + (process.env.NEXT_PUBLIC_META_TITLE || "Personal Website"),
        description: process.env.NEXT_PUBLIC_META_DESCRIPTION || "Welcome to my personal website!",
        image: baseUrl + "/avatar.jpg"
    }

    return (
        <div>
            <Head>
                <title>{meta.title}</title>
                <meta name="description" content={meta.description}/>
                <link rel="icon" href="/favicon.ico"/>

                <meta property="og:type" content="website"/>
                <meta property="og:url" content={meta.url}/>
                <meta property="og:title" content={meta.title}/>
                <meta property="og:description" content={meta.description}/>
                <meta property="og:image" content={meta.image}/>
            </Head>
            <header className={stylesHeader.header}>
                <nav>
                    <HeaderButton href="/" icon="home">Главная</HeaderButton>
                </nav>
                <nav>
                    <HeaderButton href="/auth" icon="right-to-bracket">Авторизация</HeaderButton>
                    <HeaderButton href="/profile/1" icon="user">Профиль</HeaderButton>
                    <HeaderButton href="/logout" icon="right-from-bracket">Выйти</HeaderButton>
                </nav>
            </header>
            <main className={className ? className : "center flex-column"}>
                {children}
            </main>
        </div>
    )
}