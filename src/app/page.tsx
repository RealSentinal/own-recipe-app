"use client"
//backend
import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

//frontend
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"


export default function Home() {
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
      console.log(response)
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
    <main className="w-screen h-screen flex items-start justify-center bg-zinc-900 p-6 relative">
      {/* search bar */}
      <div className="w-full flex flex-col items-center">
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
              <div className="w-full h-full flex items-center justify-center"><h1 className="text-white text-2xl">Recipes not found!</h1></div>
          }
        </div>
      </div>
      {/* main content */}
      <div></div>
    </main>
  );
}
