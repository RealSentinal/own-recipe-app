"use client"
//backend
import { useState } from "react"
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
      const response = await axios.get(`/api/recipe?query=${query}`)
      console.log(response)
      if (response.data.results.length === 0) {
        setRecipes([])
        return
      }
      console.log(response.data.results)
    }, 2000)
  }

  //search bar items visibility
  const [showSearch, setShowSearch] = useState(false)
  const toggleSearch = () => {
    setShowSearch(!showSearch)
  }

  return (
    <main className="w-screen h-screen flex items-start justify-center bg-zinc-900 p-6 relative">
      {/* search bar */}
      <div className="w-full flex flex-col items-center">
        <div className="w-full flex items-center justify-center relative">
          <Search className="text-neutral-400 absolute mr-[57%]" />
          <Input onFocus={toggleSearch} onBlur={toggleSearch} onChange={(e) => search(e.target.value)} className="w-[60%] h-12 pl-12 bg-zinc-800 border-none caret-white text-white shadow-2xl" placeholder="Search Recipes" />
        </div>
        <div className={showSearch ? "absolute top-[86px] bg-zinc-800 w-[60%] h-96 p-4 rounded-xl shadow-2xl" : "hidden"}>
          {
            recipes.length !== 0 && recipes !== undefined ?
              <div className="w-full h-full">not empty</div>
              :
              <div className="w-full h-full flex items-center justify-center"><h1 className="text-white text-2xl">Recipes not found!</h1></div>
          }
        </div>
      </div>
    </main>
  );
}
