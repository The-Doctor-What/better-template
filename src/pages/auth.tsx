import {Layout, Link} from "@/components";
import stylesAuth from "@/styles/auth.module.css";
import stylesInput from "@/styles/input.module.css";
import stylesButton from "@/styles/button.module.css";

export default function Auth() {
    return (
        <Layout title="Авторизация">
            <section className="center flex-column">
                <form className={`center flex-column ${stylesAuth.authForm}`}>
                    <h1>Авторизация</h1>
                    <div className="center flex-column">
                        <div className={stylesInput.inputHolder}>
                            <input type="text" placeholder="Логин" className={stylesInput.input} required/>
                        </div>
                        <div className={stylesInput.inputHolder}>
                            <input type="password" placeholder="Пароль" className={stylesInput.input} required/>
                        </div>
                        <Link href="/" icon="user-plus">Зарегистрироваться</Link>
                        <button className={stylesButton.button}><i className="fa-solid fa-sign-in"></i>⠀Войти</button>
                    </div>
                    <p className="bold">Или войдите с помощью:</p>
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
