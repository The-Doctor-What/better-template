import {Layout, Link} from "@/components";
import stylesError from "@/styles/error.module.css";
import stylesEdit from "@/styles/edit.module.css";
import stylesComponents from "@/styles/components.module.css";
import {GetServerSideProps} from "next";

type ProfileEdit = {
    user: any,
    sender: any,
    role: any,
}

export default function ProfileEditPage({user, sender, role}: ProfileEdit) {
    if (!user) {
        return (
            <Layout title={"Пользователь не найден"}>
                <section className={`${stylesError.errorSection} center flex-column`}>
                    <h1>Пользователь не найден</h1>
                    <p className={stylesError.text}>Пользователь с таким id не найден</p>
                    <Link href="/members" icon="user-group">Список пользователей</Link>
                </section>
            </Layout>
        )
    }

    if (sender.access <= role.access && !sender.self) {
        return (
            <Layout title={"Недостаточно прав"}>
                <section className={`${stylesError.errorSection} center flex-column`}>
                    <h1>Недостаточно прав</h1>
                    <p className={stylesError.text}>У вас недостаточно прав для редактирования этого пользователя</p>
                    <Link href="/" icon="home">Мне все равно, верни меня на главную</Link>
                </section>
            </Layout>
        )
    }

    return (
        <Layout title={"Редактирование профиля"}>
            <section>
                <div className={stylesEdit.profile}>
                    <img src={user.avatar} alt="Аватар"/>
                    <div className={stylesEdit.profileInfo}>
                        <h3>{user.name}</h3>
                        <p>{role.name}</p>
                    </div>
                </div>
                <div>
                    <nav className={stylesEdit.tabs}>
                        <button className={stylesEdit.dataSelected}>Основные</button>
                        <button>Безопасность</button>
                        <button>Сменить аватар</button>
                        {(sender.access >= role.access || sender.self) && sender.access > 5 ? (
                            <button>Управление доступом</button>
                        ) : null}
                    </nav>
                    <div className={stylesEdit.content}>
                        <form>
                            <label className="bold">Сменить имя</label>
                            <input type="text" placeholder="Введите новое имя" className={stylesComponents.input} required/>
                            <button type="submit" className={stylesComponents.button}><i
                                className="fa-solid fa-floppy-disk"></i>⠀Сохранить</button>
                        </form>
                        <form className="bold">
                            <label>Сменить номер телефона</label>
                            <input type="text" placeholder="Введите новый номер телефона" className={stylesComponents.input} required pattern="^(\+7|8)\s?\(?\d{3}\)?\s?\d{3}(-|\s)?\d{2}(-|\s)?\d{2}$"/>
                            <button type="submit" className={stylesComponents.button}><i
                                className="fa-solid fa-floppy-disk"></i>⠀Сохранить</button>
                        </form>
                        <form className="bold">
                            <label>Сменить адрес</label>
                            <input type="text" placeholder="Введите новый адрес" className={stylesComponents.input} required/>
                            <button type="submit" className={stylesComponents.button}><i
                                className="fa-solid fa-floppy-disk"></i>⠀Сохранить</button>
                        </form>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps<ProfileEdit> = async (ctx) => {
    const empty = {
        props: {
            user: null,
            sender: {
                access: 5,
                self: true,
                token: null,
            },
            role: null,
        },
    };
    try {

        const {id} = ctx.query;

        const users = [{
            id: 1,
            name: "Mary_Wilson",
            avatar: "https://137.74.244.142/uploads/posts/2022-03/thumbs/1646760865_26-adonius-club-p-devushka-za-kompyuterom-art-34.jpg",
            role: 1,
            email: "better@template.com",
            phone: "+7 (999) 999-99-99",
            address: "Москва, Красная площадь, 1",
        }]

        const roles = [{
            id: 1,
            name: "Developer",
            icon: "code",
            access: 5
        }]

        const user = users.find((user) => user.id === Number(id));
        if (!user) return empty;

        const role = roles.find((role) => role.id === user.role);
        if (!role) return empty;

        return {
            props: {
                user: user,
                sender: empty.props.sender,
                role: role,
            },
        };
    } catch (e) {
        return empty;
    }
};