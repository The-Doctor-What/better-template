import {NextApiRequest, NextApiResponse} from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const request = req.body
    const token = req.cookies.token

    if (!request.key || !request.value) {
        return res.send({status: "error", message: "Не все поля заполнены"})
    }

    if (!token) {
        return res.send({status: "error", message: "Вы не авторизованы"})
    }

    return res.send({status: "error", message: "Просим прощения, но редактирование временно недоступно"})
}