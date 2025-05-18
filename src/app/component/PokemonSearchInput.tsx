"use client";
import { useRouter } from "next/navigation";
import { useRef, FormEvent } from "react";

export default function PokemonSearchInput() {
    const name = useRef<HTMLInputElement>(null);
    const router = useRouter();

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const val = name.current?.value.trim();
        if (val) router.push("/Pokemon/" + val.toLowerCase());
    }

    return (
        <form className="w-full flex justify-center" onSubmit={handleSubmit}>
            <input ref={name} className="p-2 w-3/4 md:w-1/4 bg-white text-black rounded-xl" placeholder="Pokemon name..." required />
        </form>
    );
}