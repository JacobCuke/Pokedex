import { useRef } from "react";
import { formatPokemonName } from "./Api";
import { getTypeColorGradient } from "./PokemonCard";
import { TYPE_COLORS } from "../constants/constants";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import pokeballIcon from "../assets/img/pokeball-icon.png";

const DetailModal = ({ detailPokemon, toggleModal }) => {
  const modalBackground = useRef();

  const handleBackgroundClick = (e) => {
    if (e.target === modalBackground.current) {
      toggleModal();
    }
  };

  const typeColorGradient = getTypeColorGradient(detailPokemon.types);

  return (
    <div
      ref={modalBackground}
      className="modal-background"
      onClick={handleBackgroundClick}
    >
      <div
        className="modal-container"
        style={{
          background: `linear-gradient(${typeColorGradient[0]} 35%, ${typeColorGradient[1]}) 100%`,
        }}
      >
        {/* <h3>{formatPokemonName(detailPokemon.species.name)}</h3> */}
        <div className="info-box-sprite">
          <h4 className="pokemon-text">
            {"#" + ("00" + detailPokemon.id).slice(-3)}
          </h4>
          <img
            className="pokeball-icon"
            src={pokeballIcon}
            alt="pokeball icon"
          />
          <div className="modal-sprite-container">
            <LazyLoadImage
              className="pokemon-sprite"
              src={
                detailPokemon.sprites.other["official-artwork"].front_default
              }
              alt={detailPokemon.name}
              effect="blur"
            />
          </div>
          <h3 className="pokemon-text">
            {formatPokemonName(detailPokemon.species.name)}
          </h3>
          <div className="type-list">
            {detailPokemon.types.map((type) => (
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
          <div className="pokemon-genera">Seed Pokémon</div>
        </div>
        <div className="info-box-stats"></div>
        <button className="modal-close" onClick={toggleModal}>
          &times;
        </button>
      </div>
    </div>
  );
};

export default DetailModal;
