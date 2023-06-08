import {NextApiRequest, NextApiResponse} from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const request = req.body
    const token = req.cookies.token

    if (!request.password) return res.send({status: "error", message: "Вы не указали пароль"})
    if (!token) return res.send({status: "error", message: "Вы не авторизованы"})
    if (!request.newPassword) return res.send({status: "error", message: "Не указан новый пароль"})
    if (request.newPassword.length < 8) return res.send({status: "error", message: "Пароль должен быть не менее 8 символов"})

    return res.send({status: "error", message: "Просим прощения, но смена пароля временно недоступна"})
}