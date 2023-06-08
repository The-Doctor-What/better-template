import {NextApiRequest, NextApiResponse} from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const token = req.cookies.token

    if (!token) return res.send({status: "error", message: "Вы не авторизованы"})

    return res.send({status: "error", message: "Просим прощения, но закрытие сессий временно недоступно"})
}