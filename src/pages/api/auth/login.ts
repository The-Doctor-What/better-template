import {NextApiRequest, NextApiResponse} from "next";
import sha256 from "crypto-js/sha256";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const user = req.body

    if (!user.email || !user.password) return res.send({status: "error", message: "Не указаны данные для авторизации"})
    user.password = sha256(user.password).toString()

    return res.send({status: "error", message: "Просим прощения, но авторизация временно недоступна"})
}