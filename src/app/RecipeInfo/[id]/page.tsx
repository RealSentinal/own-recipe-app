"use client"
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Recipe({ params }: { params: { id: string } }) {
    const { id } = params
    const [recipe, setRecipe] = useState<any>({})
    const fetchRecipe = async () => {
        const response = await axios.get(`/api/GetRecipeInformation?id=${id}`)
        setRecipe(response.data)
    }
    useEffect(() => {
        fetchRecipe()
    }, [])
    return (
        <div>
            <h1>Recipe: {recipe.title}</h1>
        </div>
    )
}