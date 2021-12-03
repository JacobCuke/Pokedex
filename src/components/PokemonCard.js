import { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { getPokemonDetails } from "./Api.js";
import loadingWheel from "../assets/img/loading-wheel.png";

const PokemonCard = ({ pokemon }) => {
  const [pokemonDetails, setPokemonDetails] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getPokemonDetails(pokemon.url).then((data) => {
      setPokemonDetails(data);
      setLoading(false);
    });

    return () => setPokemonDetails({});
  }, [pokemon]);

  return (
    <li>
      <article>
        {loading ? (
          <>
            <p>Loading Pokemon data...</p>
            <img
              className="loading-sprite"
              src={loadingWheel}
              alt="loading wheel"
            />
          </>
        ) : (
          <>
            <p>
              {pokemonDetails.name
                .toLowerCase()
                .split("-")
                .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                .join(" ")}
            </p>
            <img
              className="pokemon-sprite"
              src={pokemonDetails.sprites.front_default}
              alt={pokemonDetails.name}
            />
          </>
        )}
      </article>
    </li>
  );
};

// const getPokemonData = async () => {
//   const response = await axios.get(pokemon.url);
//   setPokemonDetails(response.data);
//   setLoading(false);
// };

export default PokemonCard;
