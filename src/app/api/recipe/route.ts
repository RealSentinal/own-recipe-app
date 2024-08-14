import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const query = req.query
    try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=82f24ce9d8da49039f292ab4a6770c96&query=${query.recipe}`)
        console.log(response.data)
        return Response.json(response.data)
    } catch (error) {
        return Response.json({ error: error })
    }
}