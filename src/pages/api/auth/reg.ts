import {NextApiRequest, NextApiResponse} from "next";
import sha256 from "crypto-js/sha256";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const user = req.body

    if (!user.email || !user.password || !user.name) return res.send({status: "error", message: "Не указаны данные для регистрации"})
    if (user.password.length < 8) return res.send({status: "error", message: "Пароль должен быть не менее 8 символов"})

    user.password = sha256(user.password).toString()

    return res.send({status: "error", message: "Просим прощения, но регистрация временно недоступна"})
}