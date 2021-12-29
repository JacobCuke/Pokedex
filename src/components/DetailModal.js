import { useState, useEffect, useRef } from "react";
import { getPokemonDetails, formatPokemonName } from "./Api";
import { getTypeColorGradient } from "./PokemonCard";
import { TYPE_COLORS } from "../constants/constants";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import pokeballIcon from "../assets/img/pokeball-icon.png";

const DetailModal = ({ detailPokemon, toggleModal }) => {
  const modalBackground = useRef();
  const [speciesInfo, setSpeciesInfo] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSpeciesInfo = async () => {
      const data = await getPokemonDetails(detailPokemon.species.url);
      setSpeciesInfo(data);
      setLoading(false);
    };

    if (detailPokemon != null) {
      getSpeciesInfo();
    }
  }, [detailPokemon]);

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
        <div className="info-box-sprite info-text">
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
          <div className="pokemon-genera">
            {loading ? "Loading..." : speciesInfo.genera[7].genus}
          </div>
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
          <div className="pokemon-dimensions">
            <div className="pokemon-height">
              <h5>Height</h5>
              <span>{detailPokemon.height / 10}m</span>
            </div>
            <div className="pokemon-weight">
              <h5>Weight</h5>
              <span>{detailPokemon.weight / 10}kg</span>
            </div>
          </div>
          <div className="pokemon-gender">
            <h5>Gender Ratio</h5>
            <div className="gender-ratio-container">
              {loading ? (
                <span>Loading...</span>
              ) : speciesInfo.gender_rate === -1 ? (
                <span>Gender Unknown</span>
              ) : (
                <>
                  <div
                    className="gender-ratio-segment"
                    style={{
                      backgroundColor: "#3355FF",
                      width: `${100 - speciesInfo.gender_rate * 12.5}%`,
                      borderRadius:
                        speciesInfo.gender_rate === 0
                          ? "1rem"
                          : "1rem 0 0 1rem",
                    }}
                  ></div>
                  <div
                    className="gender-ratio-segment"
                    style={{
                      backgroundColor: "#FF77DD",
                      width: `${speciesInfo.gender_rate * 12.5}%`,
                      borderRadius:
                        speciesInfo.gender_rate === 8
                          ? "1rem"
                          : "0 1rem 1rem 0",
                    }}
                  ></div>
                </>
              )}
            </div>
            <div
              className="gender-percentages"
              style={{
                opacity: loading ? 0 : speciesInfo.gender_rate === -1 ? 0 : 1,
              }}
            >
              <span style={{ color: "#6982ff" }}>
                {loading ? "-" : 100 - speciesInfo.gender_rate * 12.5}% male,{" "}
              </span>
              <span style={{ color: "#FF77DD" }}>
                {loading ? "-" : speciesInfo.gender_rate * 12.5}% female
              </span>
            </div>
          </div>
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
