import { useState } from "react";
import { useEffect } from "react/cjs/react.development";
// import { getJapaneseName } from "./Api.js";
import pokeballIcon from "../assets/img/pokeball-icon.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

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

const PokemonCard = ({ pokemonDetails }) => {
  const [loading, setLoading] = useState(true);

  // TODO: make language a state variable that can be toggled
  let useJapanese = false;

  useEffect(() => {
    setLoading(false);
  }, []);

  const typeColorGradient =
    pokemonDetails !== undefined
      ? getTypeColorGradient(pokemonDetails.types)
      : ["#858585", "#383838"];

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
            <div className="pokeball-icon-container">
              <img
                className="pokeball-icon"
                src={pokeballIcon}
                alt="pokeball icon"
              />
            </div>
            <div className="sprite-container"></div>
            <h3>Loading...</h3>
          </>
        ) : (
          <>
            <div className="pokemon-id">
              <h4>{"#" + ("00" + pokemonDetails.id).slice(-3)}</h4>
            </div>
            <div className="pokeball-icon-container">
              <img
                className="pokeball-icon"
                src={pokeballIcon}
                alt="pokeball icon"
              />
            </div>
            <div className="sprite-container">
              <LazyLoadImage
                className="pokemon-sprite"
                src={
                  pokemonDetails.sprites.other["official-artwork"].front_default
                }
                alt={pokemonDetails.name}
                effect="blur"
              />
            </div>
            <h3 className={useJapanese ? "japanese-text" : undefined}>
              {useJapanese
                ? pokemonDetails.japaneseName
                : pokemonDetails.name
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
            <div className="type-list">
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
            </div>
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

export default PokemonCard;
