import { useRef } from "react";
import { formatPokemonName } from "./Api";

const DetailModal = ({ detailPokemon, toggleModal }) => {
  const modalBackground = useRef();

  const handleBackgroundClick = (e) => {
    if (e.target === modalBackground.current) {
      toggleModal();
    }
  };

  return (
    <div
      ref={modalBackground}
      className="modal-background"
      onClick={handleBackgroundClick}
    >
      <div className="modal-container">
        <h3>{formatPokemonName(detailPokemon.species.name)}</h3>
        <button className="modal-close" onClick={toggleModal}>
          &times;
        </button>
      </div>
    </div>
  );
};

export default DetailModal;
