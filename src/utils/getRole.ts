const roles = [
    {
        id: 1,
        name: "Developer",
        icon: "code",
        access: 5
    },
    {
        id: 2,
        name: "Владелец",
        icon: "user-tie",
        access: 4
    },
    {
        id: 3,
        name: "Администратор",
        icon: "user-shield",
        access: 3
    },
    {
        id: 4,
        name: "Менеджер",
        icon: "user-secret",
        access: 2
    },
    {
        id: 5,
        name: "Пользователь",
        icon: "user",
        access: 1
    }
]

export const getRole = (id: number) => {
    return roles.find(role => role.id === id)
}

export const getRoles = () => {
    return roles
}