const RoomModal = ({ isOpen, code, handleJoinRoom, closeModal}) => {

    if (!isOpen) {
        return null;
      }
  return (
    <div className="modal-overlay">
    <div className="modal-content">
    <p className='pin'>PIN de juego:</p>
        <div className="infoModal">
          <h1 className='codeFont'>{code}</h1>
          <div className="infoModalButtons">
            <button className="roomButton" onClick={handleJoinRoom}>
              <span className="front">
                <span className="material-symbols-outlined">
                  stadia_controller
                </span>
              </span>
            </button>
            <button className="closeButton" onClick={closeModal}>
              <span className="frontClose">
                <span className="material-symbols-outlined">
                  close
                </span>
              </span>
            </button>
          </div>
        </div>
    </div>
  </div>
  )
}

export default RoomModal
