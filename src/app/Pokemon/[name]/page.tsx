import client from "@/app/lib/apolloClient";
import { GET_POKEMON_NAME } from "@/app/lib/queryName";
import { notFound } from "next/navigation";
import { Pokemon } from "@/app/types/pokemon";
import Link from "next/link";
import { dataPokemon } from "@/app/types/queryType";
export const dynamicParams = true;
export const dynamic = "force-static";
export async function generateStaticParams() {
  const names = ["pikachu", "bulbasaur", "charmander", "squirtle"];
  return names.map((name) => ({ name }));
}
export async function generateMetadata({ params }: { params: { name: string } }) {
  return {
    title: `Pokemon: ${params.name}`,
    description: `View information about ${params.name} the Pokémon`,
  };
}
export default async function PokemonPage({ params }: { params: { name: string } }) {
  const name = params.name.toLowerCase();
  try {
    const { data } = await client.query<dataPokemon>({
      query: GET_POKEMON_NAME,
      variables: { name },
      fetchPolicy: "cache-first",
    });

    if (!data.pokemon) return notFound();

    const pokemon = data.pokemon;

    return (
      <div className="w-full p-3 flex flex-col items-center">
        <Link href={"/"} className=" text-gray-400 hover:underline">Back to home page</Link>
        <h1 className="text-3xl font-bold">{pokemon.name}</h1>
        <img src={pokemon.image} alt={pokemon.name} className="w-48 h-48 my-4" />
        <p>Type: {pokemon.types.join(", ")}</p>
        <p>maxHP: {pokemon.maxHP}</p>
        <p>maxCP: {pokemon.maxCP}</p>
        <p>fleeRate: {pokemon.fleeRate}</p>
        <p>Weight: max {pokemon.weight.maximum}, min {pokemon.weight.minimum}</p>
        <p>Height: max {pokemon.height.maximum}, min {pokemon.height.minimum}</p>
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Fast Attacks</h2>
          <ul className="list-disc list-inside">
            {pokemon.attacks.fast.map((atk: any) => (
              <li key={atk.name}>
                {atk.name}, type: {atk.type}, Damage: {atk.damage}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Special Attacks</h2>
          <ul className="list-disc list-inside">
            {pokemon.attacks.special.map((atk: any) => (
              <li key={atk.name}>
                {atk.name}, type: {atk.type}, Damage: {atk.damage}
              </li>
            ))}
          </ul>
        </div>
        {pokemon.evolutions != null && pokemon.evolutions?.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Evolutions</h2>
            <ul className="list-disc list-inside">
              {pokemon.evolutions.map((evo: any) => (
                <li key={evo.id}>
                  <Link prefetch href={`/Pokemon/${evo.name.toLowerCase()}`} className="text-blue-600 hover:underline">
                    {evo.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  } catch (err) {
    console.error("Failed to fetch:", err);
    return notFound();
  }
}
