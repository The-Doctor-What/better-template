import {Layout, Link} from "@/components";
import stylesError from "@/styles/error.module.css";

export default function HomePage() {
    return (
        <Layout title={"Главная"}>
            <section className={`${stylesError.errorSection} center flex-column`}>
                <h1>Проект в разработке</h1>
                <p className={stylesError.text}>Главная страница еще не готова</p>
                <Link href="/" icon="home">Мне все равно, верни меня...</Link>
            </section>
        </Layout>
    )
}
