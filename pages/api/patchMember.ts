import cookie from 'cookie'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const cookies = cookie.parse(req.headers.cookie || '')
    if (!cookies.token) {
        console.log({ code: 401, success: false, reason: 'expired or blank cookie. revalidate token and try again.'})
        res.statusCode = 401
        res.json({code: 1, success: false, reason: 'expired or blank cookie. revalidate token and try again.' })
        throw "expired or blank cookie. revalidate token and try again."
    }

    const id = req.body.id
    const state = req.body.state
    

    const pk = "https://api.pluralkit.me/v2"
    const memres = await fetch(`${pk}/members/${id}`, {
        method: "patch",
        headers: {
            "Content-Type": "application/json",
            "Authorization": cookies.token,
        },
        body: JSON.stringify({
            name: state.name,
            display_name: state.display_name,
            color: state.color,
            birthday: state.birthday,
            pronouns: state.pronouns,
            avatar_url: state.pfp,
            banner: state.banner,
            description: state.description,
        })
    })
    const mem = await memres.json()
    console.log(mem)

    if (mem.code == 0) {
        res.statusCode = 400
        res.json({ code: 2, success: false, reason: "Server returned error 0 (500, 400, 401) See https://pluralkit.me/api/errors/#json-error-codes" })
        throw 'Server returned error 0 (500, 400, 401) See https://pluralkit.me/api/errors/#json-error-codes'
    }

    res.statusCode = 200;
    res.json({ success: true, mem:mem })
}