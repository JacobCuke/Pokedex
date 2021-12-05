import PokemonCard from "./PokemonCard";

const PokemonList = ({ pokemonList }) => {
  return (
    <ul className="pokemon-list">
      {pokemonList.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </ul>
  );
};

export default PokemonList;
