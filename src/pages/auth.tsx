import {Button, Layout, Window} from "@/components";
import stylesAuth from "@/styles/auth.module.css";
import stylesComponents from "@/styles/components.module.css";
import {useRef, useState} from "react";
import {createPortal} from "react-dom";
import {useRouter} from "next/router";
import {setCookie} from "cookies-next";

export default function AuthPage() {
    const [showModal, setShowModal] = useState(false);
    const [TitleModal, setTitleModal] = useState("");
    const [ContextModal, setContextModal] = useState("");
    const router = useRouter();

    const window = (title: string, context: string) => {
        setTitleModal(title)
        setContextModal(context)
        setShowModal(true)
    }

    const registerData = {
        name: useRef<any>(),
        email: useRef<any>(),
        password: useRef<any>(),
        passwordRepeat: useRef<any>(),
    }

    const authData = {
        email: useRef<any>(),
        password: useRef<any>(),
    }

    async function register(e: any) {
        e.preventDefault()
        if (registerData.password.current.value !== registerData.passwordRepeat.current.value) return window("Ошибка", "Пароли не совпадают")
        const res = await fetch("/api/auth/reg", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: registerData.name.current.value,
                email: registerData.email.current.value,
                password: registerData.password.current.value,
            }),
        })
        const data = await res.json();

        if (data.status == "success") {
            setCookie("token", data.token, {
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
            });
            await router.push("/");
        }

        window("Регистрация", data.message)
    }

    async function auth(e: any) {
        e.preventDefault()
        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: authData.email.current.value,
                password: authData.password.current.value,
            }),
        })
        const data = await res.json();

        if (data.status == "success") {
            setCookie("token", data.token, {
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
            });
            await router.push("/");
        }

        window("Авторизация", data.message)
    }

    async function authSocials(e: any) {
        e.preventDefault()

        window("Авторизация через соц. сети", "Просим прощения, но эта функция пока не доступна")
    }

    return (
        <Layout title="Авторизация">
            <section className={`flex-row ${stylesAuth.authSection}`}>
                <form className={`center flex-column ${stylesAuth.regForm}`}>
                    <h1>Регистрация</h1>
                    <div className="center flex-column">
                        <div className={stylesComponents.inputHolder}>
                            <input type="text" placeholder="Ваше имя" className={stylesComponents.input}
                                   ref={registerData.name} required/>
                        </div>
                        <div className={stylesComponents.inputHolder}>
                            <input type="email" placeholder="Электронная почта" className={stylesComponents.input}
                                   ref={registerData.email} required/>
                        </div>
                        <div className={stylesComponents.inputHolder}>
                            <input type="password" placeholder="Пароль" className={stylesComponents.input}
                                   ref={registerData.password} required/>
                        </div>
                        <div className={stylesComponents.inputHolder}>
                            <input type="password" placeholder="Повторите пароль" className={stylesComponents.input}
                                   ref={registerData.passwordRepeat} required/>
                        </div>
                        <Button icon="user-plus" execute={async (e) => await register(e)}>Зарегистрироваться</Button>
                    </div>
                </form>
                <form className={`center flex-column ${stylesAuth.authForm}`}>
                    <h1>Вход в аккаунт</h1>
                    <div className="center flex-column">
                        <div className={stylesComponents.inputHolder}>
                            <input type="email" placeholder="Электронная почта" className={stylesComponents.input}
                                   ref={authData.email}
                                   required/>
                        </div>
                        <div className={stylesComponents.inputHolder}>
                            <input type="password" placeholder="Пароль" className={stylesComponents.input}
                                   ref={authData.password}
                                   required/>
                        </div>
                        <Button icon="sign-in" execute={async (e) => await auth(e)}>Войти</Button>
                    </div>
                    <p className="bold">Или используйте:</p>
                    <div className="center flex-row">
                        <Button iconGroup="brands" icon="google" type="button" execute={authSocials}></Button>
                        <Button iconGroup="brands" icon="github" type="button" execute={authSocials}></Button>
                        <Button iconGroup="brands" icon="discord" type="button" execute={authSocials}></Button>
                    </div>
                </form>
            </section>
            {showModal && createPortal(
                <Window title={TitleModal} closeExecute={() => setShowModal(false)}>
                    {ContextModal}
                </Window>, document.body
            )}
        </Layout>
    )
}
