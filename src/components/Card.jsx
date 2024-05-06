import React from 'react'
import { useState, useEffect } from 'react';
import Loading from './Loading';


const Card = ({ url,index ,onClick  }) => {
    
    const [pokemon, setPokemon] = useState({});

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    

    useEffect(() => {
        const fetchPokemonDetails = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(url);
                const data = await response.json();
                console.log(data)
                // setcount(count + 1)
                setPokemon(data);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPokemonDetails();
    }, [url]);


    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <>
            {!isLoading && <div className='card py-2 px-3 m-8 rounded-lg shadow-md hover:scale-105 transition duration-300 ease-out cursor-pointer'  onClick={onClick}  >
                <img className='w-44 h-44' src={pokemon.sprites.other.dream_world.front_default} alt={pokemon.name} />
                <div className="details py-4">
                    <div className='pb-3 text-lime-900 text-sm'>{index}</div>
                    <div className="name text-lg pb-2 font-medium">{pokemon.name.toUpperCase()}</div>
                    <button className='type border bg-slate-600 text-white px-2 py-1 rounded-lg'>{pokemon.types[0].type.name}</button>
                </div>
            </div>}
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        </>
    )
}
export default Card
