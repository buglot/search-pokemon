
import Link from "next/link";
import PokemonSearchInput from "@/app/component/PokemonSearchInput";
export const dynamic = "force-static";
export default function Home() {
  return (
    <div className=" w-full flex-1 flex flex-col justify-center items-center h-screen gap-3">
      <h1 className=" text-3xl font-bold">
        Pokemon Searching
      </h1>
      <PokemonSearchInput />
      <Link href={"/list"}>List of Pokemon</Link>
    </div>
  );
}


