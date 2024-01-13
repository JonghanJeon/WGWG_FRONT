import React from "react";

export default function Modal(props) {
  function closeModal() {
    props.closeModal();
  }

  return (
    <div style={modalStyle} onClick={closeModal}>
      <div style={modalBodyStyle} onClick={(e) => e.stopPropagation()}>
        <button style={closeButtonStyle} onClick={closeModal}>
          ✖
        </button>
        {props.children}
      </div>
    </div>
  );
}

const modalStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalBodyStyle = {
  position: "absolute",
  width: "300px",
  height: "500px",
  padding: "40px",
  textAlign: "center",
  backgroundColor: "rgb(255, 255, 255)",
  borderRadius: "10px",
  boxShadow: "0 2px 3px 0 rgba(34, 36, 38, 0.15)",
};

const closeButtonStyle = {
  position: "absolute",
  top: "15px",
  right: "15px",
  border: "none",
  color: "rgba(0, 0, 0, 0.7)",
  backgroundColor: "transparent",
  fontSize: "20px",
  cursor: "pointer",
};
