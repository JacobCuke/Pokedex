import PokemonCard from "./PokemonCard";
import { useState, useEffect } from "react";
import { getPokemonList, getPokemonDetails } from "./Api";
import loadingIcon from "../assets/img/pikachu-running.gif";
import Filters from "./Filters";
import { POKEMON_PER_LOAD, REGION_INFO } from "../constants/constants";

const PokemonList = () => {
  const [numPokemon, setNumPokemon] = useState(20);
  const [loading, setLoading] = useState(true);
  const [allPokemonDetails, setAllPokemonDetails] = useState([]);
  const [displayedPokemon, setDisplayedPokemon] = useState([]);
  const [filters, setFilters] = useState({
    region: "all",
    type: "all",
    sortBy: "id",
  });

  useEffect(() => {
    const getAllPokemonDetails = async () => {
      const pokemonList = await getPokemonList(
        "https://pokeapi.co/api/v2/pokemon?limit=898"
      );

      const allResponses = await Promise.all(
        pokemonList.map((pokemon) => getPokemonDetails(pokemon.url))
      );

      setAllPokemonDetails(allResponses);
      setDisplayedPokemon(allResponses);
      setLoading(false);
    };

    getAllPokemonDetails();
  }, []);

  useEffect(() => {
    // Region
    const start = REGION_INFO[filters.region].start;
    const limit = REGION_INFO[filters.region].limit;
    let filteredPokemon = allPokemonDetails.slice(start, start + limit);

    // Type
    if (filters.type !== "all") {
      filteredPokemon = filteredPokemon.filter((pokemon) => {
        return pokemon.types
          .map((type) => type.type.name)
          .includes(filters.type);
      });
    }
    // Sort By
    if (filters.sortBy === "name") {
      filteredPokemon.sort((p1, p2) =>
        p1.species.name.localeCompare(p2.species.name)
      );
    }

    setDisplayedPokemon(filteredPokemon);
    setNumPokemon(POKEMON_PER_LOAD);
  }, [allPokemonDetails, filters]);

  const updateFilters = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  const loadMorePokemon = () => {
    setNumPokemon(numPokemon + POKEMON_PER_LOAD);
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
          {displayedPokemon.slice(0, numPokemon).map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemonDetails={pokemon} />
          ))}
        </ul>
        {numPokemon < displayedPokemon.length && (
          <button className="load-more" onClick={loadMorePokemon}>
            Load more Pokémon
          </button>
        )}
      </div>
    </>
  );
};

export default PokemonList;
