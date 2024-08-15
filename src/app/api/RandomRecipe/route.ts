import axios from 'axios'
import { NextApiRequest } from 'next'
import { NextResponse } from 'next/server'

export async function GET(req: NextApiRequest) {
    const query = req.url?.split('=')[1]
    try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.SPOONACULAR_API_KEY}&query=${query}`)
        return NextResponse.json(response.data)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: error })
    }
}