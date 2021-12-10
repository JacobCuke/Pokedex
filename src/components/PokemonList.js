import PokemonCard from "./PokemonCard";
import { useState, useEffect } from "react";
import { getPokemonList, getPokemonDetails } from "./Api";
import loadingIcon from "../assets/img/pokeball-loading-icon.png";

const PokemonList = () => {
  const [numPokemon, setNumPokemon] = useState(20);
  const [loading, setLoading] = useState(true);
  const [allPokemonDetails, setAllPokemonDetails] = useState([]);

  useEffect(() => {
    const getAllPokemonDetails = async () => {
      const pokemonList = await getPokemonList(
        "https://pokeapi.co/api/v2/pokemon?limit=898"
      );
      setAllPokemonDetails(
        await Promise.all(
          pokemonList.map((pokemon) => getPokemonDetails(pokemon.url))
        )
      );

      setLoading(false);
    };

    getAllPokemonDetails();
  }, []);

  const loadMorePokemon = () => {
    setNumPokemon(numPokemon + 20);
  };

  if (loading)
    return (
      <div className="loading-screen">
        <img src={loadingIcon} alt="loading icon" />
        <h1>Loading...</h1>
      </div>
    );

  return (
    <div className="list-container">
      <ul className="pokemon-list">
        {allPokemonDetails.slice(0, numPokemon).map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemonDetails={pokemon} />
        ))}
      </ul>
      <button onClick={loadMorePokemon}>Load More</button>
    </div>
  );
};

export default PokemonList;
