import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'

export async function GET(req: NextApiRequest) {
    console.log(req)
    // const id = req.url?.split('=')[1]
    // try {
    //     const response = await axios.get(`https://api.spoonacular.com/recipes/recipes/${id}/information?apiKey=${process.env.SPOONACULAR_API_KEY}`)
    //     return NextResponse.json(response.data)
    // } catch (error) {
    //     console.log(error)
    //     return NextResponse.json({ error: error })
    // }
}