"use client"
//backend
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation"

// ui 
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function Recipe({ params }: { params: { id: string } }) {
    const { id } = params
    const [recipe, setRecipe] = useState<any>({})
    const fetchRecipe = async () => {
        const response = await axios.get(`/api/GetRecipeInformation?id=${id}`)
        setRecipe(response.data)
        console.log(response.data)
    }
    useEffect(() => {
        fetchRecipe()
    }, [])

    //search bar
    const [recipes, setRecipes] = useState<any[]>([])
    let timeout: any
    const search = (query: string) => {
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(async () => {
            const response = await axios.get(`/api/SearchRecipe?query=${query}`)
            setRecipes(response.data.results)
            if (!response.data.results) {
                setRecipes([])
                return
            }
        }, 2000)
    }

    //search bar items visibility
    const [showSearch, setShowSearch] = useState(false)
    const toggleSearch = () => {
        setTimeout(() => {
            setShowSearch(!showSearch)
        }, 500);
    }

    //search bar items redirection
    const router = useRouter()
    const redirect = (id: number) => {
        router.push(`/RecipeInfo/${id}`)
    }

    return (
        <div className='bg-zinc-900 w-screen h-screen flex flex-col justify-start items-center'>
            <div className="w-screen flex flex-col items-center my-4">
                <div className="w-full flex items-center justify-center relative">
                    <Search className="text-neutral-400 absolute mr-[57%]" />
                    <Input onFocus={toggleSearch} onBlur={toggleSearch} onChange={(e) => search(e.target.value)} className="w-[60%] h-12 pl-14 bg-zinc-800 border-none caret-white text-white shadow-2xl" placeholder="Search Recipes" />
                </div>
                <div className={showSearch ? "absolute top-[86px] bg-zinc-800 w-[60%] h-96 p-4 rounded-xl shadow-2xl overflow-x-hidden overflow-y-hidden" : "hidden"}>
                    {
                        recipes.length !== 0 && recipes !== undefined ?
                            <div className="w-full h-full flex flex-row flex-wrap gap-3">
                                {recipes.map((recipe: any) => (
                                    <div onClick={() => redirect(recipe.id)} key={recipe.id} className="w-[40%] h-[40%] flex flex-row m-2 bg-zinc-700 rounded-2xl cursor-pointer">
                                        <img src={recipe.image} alt={recipe.id} className="rounded-l-2xl" />
                                        <h1 className="text-white text-2xl ml-2 mt-2">{recipe.title}</h1>
                                    </div>
                                ))}</div>
                            :
                            <div className="w-full h-full flex items-center justify-center"><h1 className="text-white text-2xl">Recipes not found!</h1>
                            </div>
                    }
                </div>
            </div>
            <div className='bg-zinc-800 w-[90%] flex flex-row h-fit p-4 shadow-2xl rounded-2xl'>
                <img src={recipe.image} alt={recipe.id} className='rounded-3xl' />
                <div className='flex flex-col pl-4'>
                    <h1 className='text-3xl text-white font-bold'>{recipe.title}</h1>
                    <h1 className='text-neutral-400 text-2xl'>Ready in {recipe.readyInMinutes} minutes</h1>
                    <div className="flex flex-row flex-wrap w-[310px] h-[140px]">
                        <Badge className="text-white flex items-center justify-center w-[100px] h-10 m-2 bg-zinc-700">Servings: {recipe.servings}</Badge>
                        {recipe.veryPopular && <Badge className="text-white flex items-center justify-center w-[100px] h-10 m-2 bg-zinc-700 p-2">Very Popular</Badge>}
                        {recipe.vegetarian && <Badge className="text-white flex items-center justify-center w-[100px] h-10 m-2 bg-zinc-700 p-2">Vegetarian</Badge>}
                        {recipe.vegan && <Badge className="text-white flex items-center justify-center w-[100px] h-10 m-2 bg-zinc-700 p-2">Vegan</Badge>}
                        {recipe.dairyFree && <Badge className="text-white flex items-center justify-center w-[100px] h-10 m-2 bg-zinc-700 p-2">Dairy Free</Badge>}
                        {recipe.glutenFree && <Badge className="text-white flex items-center justify-center w-[100px] h-10 m-2 bg-zinc-700 p-2">Gluten Free</Badge>}
                        {recipe.veryHealthy && <Badge className="text-white flex items-center justify-center w-[100px] h-10 m-2 bg-zinc-700 p-2">Very Healthy</Badge>}
                        {recipe.cheap && <Badge className="text-white flex items-center justify-center w-[25%] h-10 m-2 bg-zinc-700 p-2">Cheap</Badge>}
                    </div>
                </div>
            </div>
            <div className='bg-zinc-800 w-[90%] h-fit pt-5 pr-5 pl-8 shadow-2xl rounded-2xl mt-8'>
                <h1 className='text-white text-2xl font-bold'>Summary</h1>
                <div className='text-white' dangerouslySetInnerHTML={{ __html: recipe.summary }}></div>
                <h1 className='text-white text-2xl font-bold'>Ingredients</h1>
                <ul className='mb-4'>
                    {recipe?.extendedIngredients?.map((ingredient: any) => (
                        <li className='text-white'>{ingredient.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}