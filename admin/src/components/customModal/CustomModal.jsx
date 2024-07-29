import React from "react";
import Modal from "react-modal";
import "./customModal.css";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const CustomModal = ({ showModal, setShowModal, text }) => {
  function closeModal() {
    setShowModal(false);
  }

  const customStyles = {
    overlay: {
      backgroundColor: "rgb(88 88 88 / 75%)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      height: "300px",
      width: "400px",
      padding: "0",
      border: "none",
      borderRadius: "10px",
      boxShadow: "box-shadow: 0px 13px 37px 3px rgba(0,0,0,0.67);",
    },
  };

  return (
    <div className="overlay">
      <Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className="banner">
          <CheckCircleOutlineIcon className="success-icon" />
        </div>
        <CloseRoundedIcon
          className="close-icon"
          onClick={() => setShowModal(false)}
        />

        <div className="container">
          <div className="header">
            <span>SUCCESS</span>
          </div>
          <div className="text">
            <p>{text}</p>
          </div>
          <div className="footer">
            <button className="button" onClick={() => setShowModal(false)}>
              OK
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CustomModal;
