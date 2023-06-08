import {Button, Layout} from "@/components";
import stylesError from "@/styles/error.module.css";
import {useRouter} from "next/router";
import {deleteCookie} from "cookies-next";

export default function LogoutPage() {
    const router = useRouter();

    async function logout() {
        await deleteCookie("token");
        await router.push("/auth");
    }

    return (
        <Layout title={"Выход"}>
            <section className={`${stylesError.errorSection} center flex-column`}>
                <h1>Выход из аккаунта</h1>
                <p className={stylesError.text}>Вы уверены, что хотите выйти?</p>
                <Button execute={logout} icon="sign-out" type="button">Выйти</Button>
            </section>
        </Layout>
    )
}
