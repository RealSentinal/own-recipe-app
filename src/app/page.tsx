import { Input } from "@/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Search } from 'lucide-react'

export default function Home() {
  return (
    <main className="w-screen h-screen flex items-start justify-center bg-zinc-950 p-6 relative">
      {/* <div className="w-screen flex flex-row justify-center items-center">
        <Search className="text-neutral-400 absolute mr-[69%]" />
        <Input placeholder="Search for a recipe" className="w-9/12 h-12 bg-zinc-800 border-none pl-14 placeholder:text-neutral-400 focus:placeholder:text-neutral-300" />
        <Button className="h-9 ml-[55%] absolute">Give me that recipe !!!</Button>
      </div> */}
      <Command>
        <CommandInput placeholder="Search for a recipe" />
        <CommandList>
          <CommandEmpty>No recipe found.</CommandEmpty>
          <CommandGroup heading="Recipes">
            <CommandItem>Item 1</CommandItem>
            <CommandItem>Item 2</CommandItem>
            <CommandItem>Item 3</CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Recipes">
            <CommandItem>Item 1</CommandItem>
            <CommandItem>Item 2</CommandItem>
            <CommandItem>Item 3</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </main>
  );
}
