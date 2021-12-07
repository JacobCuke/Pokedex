import { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { getPokemonDetails } from "./Api.js";
import loadingWheel from "../assets/img/loading-wheel.png";
import pokeballIcon from "../assets/img/pokeball-icon3.png";

const TYPE_COLORS = {
  normal: "#a8a77a",
  fire: "#ee8130",
  water: "#6390f0",
  electric: "#f7d02c",
  grass: "#7ac74c",
  ice: "#96d9d6",
  fighting: "#c22e28",
  poison: "#a33ea1",
  ground: "#e2bf65",
  flying: "#a98ff3",
  psychic: "#f95587",
  bug: "#a6b91a",
  rock: "#b6a136",
  ghost: "#735797",
  dragon: "#6f35fC",
  dark: "#705746",
  steel: "#b7b7ce",
  fairy: "#d685ad",
};

// Secondary colors for Pokemon with one type, to make the gradient more appealing
// Only up to water complete
const SECONDARY_COLORS = {
  normal: "#d7d6ab",
  fire: "#d12929",
  water: "#185ceb",
  electric: "#f3a800",
  grass: "#b0e50e",
  ice: "#5dfbe5",
  fighting: "#d11313",
  poison: "#6a3469",
  ground: "#c3a200",
  flying: "#b8a7e9",
  psychic: "#ff004e",
  bug: "#7a8b01",
  rock: "#856f00",
  ghost: "#6204db",
  dragon: "#362f46",
  dark: "#221a14",
  steel: "#ebebed",
  fairy: "#f1a2c9",
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
                .map((s) => {
                  if (s === "m") {
                    return "♂";
                  } else if (s === "f") {
                    return "♀";
                  }
                  return s.charAt(0).toUpperCase() + s.substring(1);
                })
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
