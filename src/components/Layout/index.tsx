import Head from 'next/head'
import stylesHeader from './header.module.css'
import React from "react";
import {HeaderButton} from "@/components";

export type LayoutProps = {
    title?: string;
    children?: React.ReactNode;
}

export default function Layout({children, title}: LayoutProps) {
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
                    <HeaderButton href="/" icon="basket-shopping">Товары</HeaderButton>
                </nav>
                <nav>
                    <HeaderButton href="/auth" icon="right-to-bracket">Авторизация</HeaderButton>
                    <HeaderButton href="/" icon="cart-shopping">Корзина</HeaderButton>
                    <HeaderButton href="/" icon="clock-rotate-left">История заказов</HeaderButton>
                    <HeaderButton href="/" icon="gear">Управления</HeaderButton>
                    <HeaderButton href="/" icon="user">Профиль</HeaderButton>
                    <HeaderButton href="/" icon="right-from-bracket">Выйти</HeaderButton>
                </nav>
            </header>
            <main className={stylesHeader.main}>
                {children}
            </main>
        </div>
    )
}