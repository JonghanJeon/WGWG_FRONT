import React from "react";
import styled from "styled-components";

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  position: relative; /* 상대 위치 설정 */
`;

const ConfirmButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 20px;
`;

function PopupModal({ isOpen, onClose, children, onConfirm }) {
  if (!isOpen) return null;

  return (
    <ModalContainer>
      <ModalContent>
        {children}
        <ConfirmButton onClick={onConfirm}>확인</ConfirmButton>
      </ModalContent>
    </ModalContainer>
  );
}

export default PopupModal;
