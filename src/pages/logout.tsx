import {Layout, Link} from "@/components";
import stylesError from "@/styles/error.module.css";

export default function Logout() {
    return (
        <Layout title={"Выход"}>
            <section className={`${stylesError.errorSection} center flex-column`}>
                <h1>Выход из аккаунта</h1>
                <p className={stylesError.text}>Вы уверены, что хотите выйти?</p>
                <Link href="/auth" icon="right-from-bracket">Выйти</Link>
            </section>
        </Layout>
    )
}
