import {Layout, Link} from "@/components";
import stylesError from "@/styles/error.module.css";

export default function Home() {
    return (
        <Layout title={"Главная"}>
            <section className="center flex-column">
                <section className={`${stylesError.errorSection} center flex-column`}>
                    <h1>Проект в разработке</h1>
                    <p className={stylesError.text}>Главная страница еще не готова</p>
                    <Link href="/" icon="home">Мне все равно, верни меня...</Link>
                </section>
            </section>
        </Layout>
    )
}
