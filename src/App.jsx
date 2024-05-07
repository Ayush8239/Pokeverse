import { useState, useEffect } from 'react'
import './App.css'
import Card from './components/Card'
import Loading from './components/Loading'
import PopupCard from './components/PopupCard'

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nextPageUrl, setNextPageUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0');
  const [count, setCount] = useState(0);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  
  const fetchPokemon = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(nextPageUrl);
      const data = await response.json();
      setNextPageUrl(data.next);
      setPokemonList((prevList) => [...prevList, ...data.results]);
      setCount(count + data.results.length);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 100 && !isLoading) {
        fetchPokemon();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]);

  const handleCardClick = async(pokemon) => {
    const response = await fetch(pokemon.url);
    const data = await response.json();
    setSelectedPokemon(data);
    // setSelectedPokemon(pokemon); // Set selected pokemon on card click
  };

  const handleClosePopup = () => {
    setSelectedPokemon(null); // Clear selected pokemon to close popup
  };


  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className='relative'>
      <div className='text-center py-4 font-bold border border-b-2 sticky top-0 bg-white z-10 flex justify-between px-4'>
        <div className='flex gap-2 items-center'>
          <img className='w-10 h-10 rounded-full' src="/logo.jpeg" alt="" />
          <h1 className=' text-4xl '>Pokeverse</h1>
        </div>
        <a href={"https://github.com/"}>
          <img className='w-10 h-10' src="/github.svg" alt="" />

        </a>
      </div>
      <div className="pokemon-container pt-4 flex flex-col sm:flex-wrap sm:flex-row justify-center">
        {pokemonList.map((pokemon , index) => (
          <Card key={pokemon.name} url={pokemon.url} index={index+1} onClick={() => handleCardClick(pokemon)}/>
        ))}
        
      </div>
      {isLoading && <Loading />}
      {selectedPokemon && <PopupCard pokemon={selectedPokemon} onClose={handleClosePopup} />} 
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
    </div>
  )
}

export default App