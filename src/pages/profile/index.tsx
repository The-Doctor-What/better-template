import {Layout, Link} from "@/components";
import stylesError from "@/styles/error.module.css";

export default function Error() {
    return (
        <Layout title={"Вы не указали id пользователя"}>
            <section className={`${stylesError.errorSection} center flex-column`}>
                <h1>Вы не указали id пользователя</h1>
                <p className={stylesError.text}>Пожалуйста, укажите id пользователя в адресной строке</p>
                <Link href="/members" icon="user-group">Список пользователей</Link>
            </section>
        </Layout>
    )
}
