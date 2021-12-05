import { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { getPokemonDetails } from "./Api.js";
import loadingWheel from "../assets/img/loading-wheel.png";
import pokeballIcon from "../assets/img/pokeball-icon3.png";

const TYPE_COLORS = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

const SECONDARY_COLORS = {
  normal: "#A8A77A",
  fire: "#D12929",
  water: "#185CEB",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

const PokemonCard = ({ pokemon }) => {
  const [pokemonDetails, setPokemonDetails] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getPokemonDetails(pokemon.url).then((data) => {
      setPokemonDetails(data);
      setLoading(false);
    });

    return () => setPokemonDetails(undefined);
  }, [pokemon]);

  const typeColorGradient =
    pokemonDetails !== undefined
      ? getTypeColorGradient(pokemonDetails.types)
      : ["white", "white"];

  return (
    <li>
      <article
        className="pokemon-card"
        style={{
          background: `radial-gradient(circle at top, ${typeColorGradient[0]} 35%, ${typeColorGradient[1]}) 100%`,
        }}
      >
        {loading ? (
          <>
            <img
              className="loading-sprite"
              src={loadingWheel}
              alt="loading wheel"
            />
            <p>Loading Pokemon data...</p>
          </>
        ) : (
          <>
            <div className="pokeball-icon-container">
              <img
                className="pokeball-icon"
                src={pokeballIcon}
                alt="pokeball icon"
              />
            </div>
            <img
              className="pokemon-sprite"
              src={
                pokemonDetails.sprites.other["official-artwork"].front_default
              }
              alt={pokemonDetails.name}
            />
            <h3>
              {pokemonDetails.name
                .toLowerCase()
                .split("-")
                .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                .join(" ")}
            </h3>
            <p>
              {pokemonDetails.types.map((type) => (
                <span
                  key={type.slot}
                  className="type-badge"
                  style={{ backgroundColor: `${TYPE_COLORS[type.type.name]}` }}
                >
                  {type.type.name.charAt(0).toUpperCase() +
                    type.type.name.slice(1)}
                </span>
              ))}
            </p>
          </>
        )}
      </article>
    </li>
  );
};

const getTypeColorGradient = (typesArray) => {
  if (typesArray.length === 1) {
    return [
      TYPE_COLORS[typesArray[0].type.name],
      SECONDARY_COLORS[typesArray[0].type.name],
    ];
  } else {
    return [
      TYPE_COLORS[typesArray[0].type.name],
      TYPE_COLORS[typesArray[1].type.name],
    ];
  }
};

// const getPokemonData = async () => {
//   const response = await axios.get(pokemon.url);
//   setPokemonDetails(response.data);
//   setLoading(false);
// };

export default PokemonCard;
