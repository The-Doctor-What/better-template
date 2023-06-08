import {Button, Layout, Link, Window} from "@/components";
import stylesError from "@/styles/error.module.css";
import stylesComponents from "@/styles/components.module.css";
import stylesSettings from "@/styles/settings.module.css";
import {GetServerSideProps} from "next";
import {useRef, useState} from "react";
import {setCookie} from "cookies-next";
import {createPortal} from "react-dom";
import {getUser} from "@/utils/getUser";
import {getRole} from "@/utils/getRole";
import LinkNext from "next/link";

type ProfileEdit = {
    user: any,
    sender: any,
    role: any,
}

export default function ProfileEditPage({user, sender, role}: ProfileEdit) {
    const [settingsSection, setSettingsSection] = useState(1)
    const [avatarUrl, setAvatarUrl] = useState(null)
    const [showModal, setShowModal] = useState(false);
    const [TitleModal, setTitleModal] = useState("");
    const [ContextModal, setContextModal] = useState("");

    const window = (title: string, context: string) => {
        setTitleModal(title)
        setContextModal(context)
        setShowModal(true)
    }

    const mainSettings = {
        name: useRef<any>(),
        role: useRef<any>(),
        address: useRef<any>(),
        avatar: useRef<any>(),
    }

    const securitySettings = {
        login: useRef<any>(),
        email: useRef<any>(),
        password: useRef<any>(),
        newPassword: useRef<any>(),
        newPasswordRepeat: useRef<any>(),
    }

    const changeSettings = async (e: any, key: any, value: any) => {
        e.preventDefault();
        const request = await fetch(`/api/settings/mainEdit`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                key: key,
                value: value.current?.value
            })
        })

        const data = await request.json();

        window("Обновление данных", data.message)
    }

    async function changeEmail(e: any) {
        e.preventDefault();
        const request = await fetch(`/api/settings/changeEmail`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                login: securitySettings.login.current?.value
            })
        })

        const data = await request.json();
        if (data.status == "success") setCookie("token", data.token, {
            maxAge: 30 * 24 * 60 * 60,
            path: "/",
        })
        window("Смена логина", data.message)
    }
    async function closeSessions(e: any) {
        e.preventDefault();
        const request = await fetch(`/api/settings/closeSessions`)
        const data = await request.json();
        if (data.status == "success") setCookie("token", data.token, {
            maxAge: 30 * 24 * 60 * 60,
            path: "/",
        })
        window("Закрытие сессий", data.message)
    }
    async function changePassword(e: any) {
        e.preventDefault();
        if (securitySettings.newPassword.current?.value != securitySettings.newPasswordRepeat.current?.value) {
            window("Смена пароля", "Новые пароли не совпадают")
            return;
        }
        const request = await fetch(`/api/settings/changePassword`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password: securitySettings.password.current?.value,
                newPassword: securitySettings.newPassword.current?.value,
            })
        })

        const data = await request.json();
        if (data.status == "success") setCookie("token", data.token, {
            maxAge: 30 * 24 * 60 * 60,
            path: "/",
        })
        window("Смена пароля", data.message)
    }

    if (!user) {
        return (
            <Layout title={"Пользователь не найден"}>
                <section className={`${stylesError.errorSection} center flex-column`}>
                    <h1>Пользователь не найден</h1>
                    <p className={stylesError.text}>Пользователь с таким id не найден</p>
                    <Link href="/members" icon="user-group">Список пользователей</Link>
                </section>
            </Layout>
        )
    }

    if (sender.access <= role.access && !sender.self) {
        return (
            <Layout title={"Недостаточно прав"}>
                <section className={`${stylesError.errorSection} center flex-column`}>
                    <h1>Недостаточно прав</h1>
                    <p className={stylesError.text}>У вас недостаточно прав для редактирования этого пользователя</p>
                    <Link href="/" icon="home">Мне все равно, верни меня на главную</Link>
                </section>
            </Layout>
        )
    }

    return (
        <Layout title={"Редактирование профиля"} className="justify-center flex-row flex-wrap">
            <section className={`${stylesSettings.sections}`}>
                <LinkNext href={`/profile/${user.id}`} key={user.id} className={stylesSettings.profile}>
                    <img src={user.avatar} alt="Аватар"/>
                    <div className={stylesSettings.profileInfo}>
                        <h3>{user.name}</h3>
                        <p><i className={`fa-solid fa-${role.icon}`}/> {role.name}</p>
                    </div>
                </LinkNext>
                <h1>Управление</h1>
                <Button execute={() => {
                    setSettingsSection(1)
                }} icon="house" type="button">Основные данные</Button>
                <Button execute={() => {
                    setSettingsSection(2)
                }} icon="image" type="button">Изменить аватар</Button>
                <Button execute={() => {
                    setSettingsSection(3)
                }} icon="key" type="button">Безопасность</Button>
            </section>
            <section className={`${stylesSettings.section}`}>
                {settingsSection == 1 && (
                    <div className="center flex-column">
                        <h1>Основные данные</h1>
                        <form onSubmit={async (e) => await changeSettings(e, "name", mainSettings.name)}
                              className="center flex-column">
                            <div className="center flex-row">
                                <input type="text" placeholder="Новое имя" ref={mainSettings.name}
                                       className={stylesComponents.input} required/>
                                <Button type="submit" icon="floppy-disk"/>
                            </div>
                        </form>
                        <form onSubmit={async (e) => await changeSettings(e, "role", mainSettings.role)}
                              className="center flex-column">
                            <div className="center flex-row">
                                <input type="text" placeholder="Новая роль" ref={mainSettings.role}
                                       className={stylesComponents.input} required/>
                                <Button type="submit" icon="floppy-disk"/>
                            </div>
                        </form>
                        <form onSubmit={async (e) => await changeSettings(e, "address", mainSettings.address)}
                              className="center flex-column">
                            <div className="center flex-row">
                                <input type="text" placeholder="Новый адрес" ref={mainSettings.address}
                                       className={stylesComponents.input} required/>
                                <Button type="submit" icon="floppy-disk"/>
                            </div>
                        </form>
                    </div>)}
                {settingsSection == 2 && (
                    <div className="center flex-column">
                        <h1>Изменить аватар</h1>
                        {avatarUrl && (
                            <div className="center flex-column">
                                <p className="bold">Предпросмотр</p>
                                <img src={avatarUrl} className={stylesSettings.avatar} alt="Предпросмотр"/>
                            </div>
                        )}
                        <form onSubmit={async (e) => await changeSettings(e, "avatar", mainSettings.avatar)}
                              className="center flex-column">
                            <input type="text" placeholder="Ссылка новую на фотографию" ref={mainSettings.avatar}
                                   className={stylesComponents.input} required/>
                            <Button icon="refresh" type="button" execute={
                                () => {
                                    setAvatarUrl(mainSettings.avatar.current?.value)
                                }}>
                                Обновить предпросмотр
                            </Button>
                            <Button type="submit" icon="check">Сохранить</Button>
                        </form>

                    </div>)}
                {settingsSection == 3 && (
                    <div className="center flex-column">
                        <h1>Безопасность</h1>
                        <form onSubmit={async (e) => await changeEmail(e)}
                              className="center flex-column">
                            <p className="bold">Изменить электронную почту</p>
                            <input type="email" placeholder="Электронная почта" ref={securitySettings.email}
                                   className={stylesComponents.input} required/>
                            <Button type="submit" icon="check">Сохранить</Button>
                        </form>
                        <form onSubmit={async (e) => await changePassword(e)}
                              className="center flex-column">
                            <p className="bold">Изменить пароль</p>
                            <input type="password" placeholder="Старый пароль" ref={securitySettings.password}
                                   className={stylesComponents.input} required/>
                            <input type="password" placeholder="Новый пароль" ref={securitySettings.newPassword}
                                   className={stylesComponents.input} required/>
                            <input type="password" placeholder="Повторите новый пароль"
                                   ref={securitySettings.newPasswordRepeat}
                                   className={stylesComponents.input} required/>
                            <Button type="submit" icon="check">Сохранить</Button>
                        </form>
                        <div className="center flex-column">
                            <Button icon="sign-out" type="button" execute={async (e) => await closeSessions(e)}>
                                Завершить все сеансы
                            </Button>
                        </div>
                    </div>)}
            </section>
            {showModal && createPortal(
                <Window title={TitleModal} closeExecute={() => setShowModal(false)}>
                    {ContextModal}
                </Window>, document.body
            )}
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps<ProfileEdit> = async (ctx) => {
    const empty = {
        props: {
            user: null,
            sender: {
                access: 5,
                self: true,
                token: null,
            },
            role: null,
        },
    };
    try {

        const {id} = ctx.query;

        const user = await getUser(Number(id))
        if (!user) return empty;

        const role = await getRole(user.role);

        return {
            props: {
                user: user,
                sender: empty.props.sender,
                role: role,
            },
        };
    } catch (e) {
        return empty;
    }
};