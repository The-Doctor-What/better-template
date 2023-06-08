import {NextApiRequest, NextApiResponse} from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const request = req.body
    const token = req.cookies.token

    if (!request.email) return res.send({status: "error", message: "Новая почта не указана"})
    if (!token) return res.send({status: "error", message: "Вы не авторизованы"})

    return res.send({status: "error", message: "Просим прощения, но смена почты временно недоступна"})
}