import client from "@/app/lib/apolloClient"
import { GET_POKEMON_LIST } from "@/app/lib/queryList"
import { dataPokemonlist } from "@/app/types/queryType"
import Link from "next/link"

export const dynamic = "force-static";
export default async function PageList() {
    const { data } = await client.query<dataPokemonlist>({ query: GET_POKEMON_LIST, variables: { "first": 160 }, fetchPolicy: "cache-first" })
    const pokemons = data.pokemons
    return (
        <main className="flex flex-col gap-2 p-2 w-full">
            <ul className="list-item">
                {pokemons.length > 0 && pokemons.map((v, i) =>

                    <li key={i}>

                        <Link className="hover:underline" href={"/Pokemon/" + v.name}>{v.number} {v.name}</Link>
                    </li>
                )}
            </ul>

        </main>
    )
}