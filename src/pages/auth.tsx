import {Layout, Link} from "@/components";
import stylesAuth from "@/styles/auth.module.css";
import stylesComponents from "@/styles/components.module.css";

export default function Auth() {
    return (
        <Layout title="Авторизация">
            <section className={`flex-row ${stylesAuth.authSection}`}>
                <form className={`center flex-column ${stylesAuth.regForm}`}>
                    <h1>Регистрация</h1>
                    <div className="center flex-column">
                        <div className={stylesComponents.inputHolder}>
                            <input type="text" placeholder="Ваше имя" className={stylesComponents.input} required/>
                        </div>
                        <div className={stylesComponents.inputHolder}>
                            <input type="email" placeholder="Электронная почта" className={stylesComponents.input} required/>
                        </div>
                        <div className={stylesComponents.inputHolder}>
                            <input type="password" placeholder="Пароль" className={stylesComponents.input} required/>
                        </div>
                        <div className={stylesComponents.inputHolder}>
                            <input type="password" placeholder="Повторите пароль" className={stylesComponents.input} required/>
                        </div>
                        <button className={stylesComponents.button}><i className="fa-solid fa-sign-in"></i>⠀Зарегистрироваться</button>
                    </div>
                </form>
                <form className={`center flex-column ${stylesAuth.authForm}`}>
                    <h1>Вход в аккаунт</h1>
                    <div className="center flex-column">
                        <div className={stylesComponents.inputHolder}>
                            <input type="email" placeholder="Электронная почта" className={stylesComponents.input} required/>
                        </div>
                        <div className={stylesComponents.inputHolder}>
                            <input type="password" placeholder="Пароль" className={stylesComponents.input} required/>
                        </div>
                        <button className={stylesComponents.button}><i className="fa-solid fa-sign-in"></i>⠀Войти</button>
                    </div>
                    <p className="bold">Или используйте:</p>
                    <div className="center flex-row">
                        <Link href="/" iconGroup="brands" icon="google"></Link>
                        <Link href="/" iconGroup="brands" icon="github"></Link>
                        <Link href="/" iconGroup="brands" icon="discord"></Link>
                    </div>
                </form>
            </section>
        </Layout>
    )
}
