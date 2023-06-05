import {Layout, Link} from "@/components";
import LinkNext from "next/link";
import stylesError from "@/styles/error.module.css";
import {GetServerSideProps} from "next";
import {getUsers} from "@/utils/getUser";
import {getRoles} from "@/utils/getRole";
import stylesEdit from "@/styles/edit.module.css";

type Members = {
    users: any,
    sender: any,
    roles: any,
}

export default function MembersPage({users, sender, roles}: Members) {
    if (!sender.access) {
        return (
            <Layout title={"Пользователи"}>
                <section className={`${stylesError.errorSection} center flex-column`}>
                    <h1>403</h1>
                    <p className={stylesError.text}>Доступ запрещен</p>
                    <Link href="/" icon="home">Мне все равно, верни меня на главную</Link>
                </section>
            </Layout>
        )
    }

    return (
        <Layout title={"Пользователи"}>
            <h1>Список пользователей</h1>
            <section className={`center flex-row flex-wrap ${stylesEdit.users}`}>
                {users.map((user: any) => (
                    <LinkNext href={`/profile/${user.id}`} key={user.id} className={stylesEdit.profile}>
                        <img src={user.avatar} alt="Аватар"/>
                        <div className={stylesEdit.profileInfo}>
                            <h3>{user.name}</h3>
                            {roles.map((role: any) => (
                                role.id === user.role ? (
                                    <p><i className={`fa-solid fa-${role.icon}`}/> {role.name}</p>
                                ) : null
                            ))}
                        </div>
                    </LinkNext>
                ))}
            </section>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps<Members> = async () => {
    const empty = {
        props: {
            users: [],
            sender: {
                access: true,
            },
            roles: [],
        },
    };
    try {
        const users = getUsers()
        const roles = getRoles()

        return {
            props: {
                users: users,
                sender: empty.props.sender,
                roles: roles,
            },
        };
    } catch (e) {
        return empty;
    }
};