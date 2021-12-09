import PokemonCard from "./PokemonCard";

const PokemonList = ({ pokemonList }) => {
  return (
    <div className="list-container">
      <ul className="pokemon-list">
        {pokemonList.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </ul>
    </div>
  );
};

export default PokemonList;
