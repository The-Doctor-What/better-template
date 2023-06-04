import {Layout, Link} from "@/components";
import stylesError from "@/styles/error.module.css";

export default function Error() {
    return (
        <Layout title={"Страница не найдена"}>
            <section className="center flex-column">
                <section className={`${stylesError.errorSection} center flex-column`}>
                    <h1>404</h1>
                    <p className={stylesError.text}>Страница не найдена</p>
                    <Link href="/" icon="home">Мне все равно, верни меня на главную</Link>
                </section>
            </section>
        </Layout>
    )
}
