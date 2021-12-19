import PokemonCard from "./PokemonCard";
import { useState, useEffect } from "react";
import { getPokemonList, getPokemonDetails } from "./Api";
import loadingIcon from "../assets/img/pikachu-running.gif";
import Filters from "./Filters";

const PokemonList = () => {
  const [numPokemon, setNumPokemon] = useState(20);
  const [loading, setLoading] = useState(true);
  // const [allPokemonLoaded, setAllPokemonLoaded] = useState(false);
  const [allPokemonDetails, setAllPokemonDetails] = useState([]);
  const [filters, setFilters] = useState({
    region: "all",
    type: "all",
    sortBy: "id",
  });

  // Load just the first 20 Pokemon to ensure a quick load time
  // useEffect(() => {
  //   const getInitialPokemonDetails = async () => {
  //     const pokemonList = await getPokemonList(
  //       "https://pokeapi.co/api/v2/pokemon?limit=20"
  //     );

  //     setAllPokemonDetails(
  //       await Promise.all(
  //         pokemonList.map((pokemon) => getPokemonDetails(pokemon.url))
  //       )
  //     );

  //     setLoading(false);
  //   };

  //   getInitialPokemonDetails();
  // }, []);

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

    // if (loading === false) {
    getAllPokemonDetails();
    // }
  }, []);

  useEffect(() => {
    console.log(filters);
  }, [filters]);

  const updateFilters = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

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
    <>
      <Filters filters={filters} updateFilters={updateFilters} />
      <div className="list-container">
        <ul className="pokemon-list">
          {allPokemonDetails.slice(0, numPokemon).map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemonDetails={pokemon} />
          ))}
        </ul>
        <button className="load-more" onClick={loadMorePokemon}>
          Load more Pokémon
        </button>
      </div>
    </>
  );
};

export default PokemonList;
