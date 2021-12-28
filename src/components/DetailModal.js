const DetailModal = ({ toggleModal }) => {
  return (
    <div className="modal-background">
      <div className="modal-container">
        This is a modal <button onClick={toggleModal}>Close</button>
      </div>
    </div>
  );
};

export default DetailModal;
