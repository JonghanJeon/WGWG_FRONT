import React, { useState } from "react";
import styled from "styled-components"; // 스타일 컴포넌트 라이브러리 사용
import axios from "axios";
import PopupModal from "./PopupModal";
import { useNavigate } from "react-router-dom";

const LoginPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const LoginForm = styled.form`
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FormLabel = styled.label`
  font-size: 1.2rem;
  margin-bottom: 8px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

const FormButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
`;

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태 추가
  const [isFailureModalOpen, setIsFailureModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:9000/users/login", {
        email: email,
        password: password,
      });
      console.log("로그인 성공:", response.data.data);
      sessionStorage.setItem("userSeq", response.data.data.userSeq);
      sessionStorage.setItem("nickName", response.data.data.nickName);
      setIsModalOpen(true); // 모달 열기
    } catch (error) {
      console.error("로그인 실패:", error);
      openFailureModal();
    }
  };

  const openFailureModal = () => {
    setIsFailureModalOpen(true);
  };

  const handleConfirm = () => {
    setIsModalOpen(false);
    window.location.reload();
    window.location.href = "/";
    // navigate("/");
  };

  const handleFailureConfirm = () => {
    setIsFailureModalOpen(false);
  };

  return (
    <LoginPageContainer>
      <LoginForm>
        <h2>로그인</h2>
        <FormLabel htmlFor="email">이메일:</FormLabel>
        <FormInput
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormLabel htmlFor="password">비밀번호:</FormLabel>
        <FormInput
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormButton type="button" onClick={handleLogin}>
          로그인
        </FormButton>
      </LoginForm>
      <PopupModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
      >
        <p>로그인에 성공했습니다!</p>
      </PopupModal>
      <PopupModal
        isOpen={isFailureModalOpen}
        onClose={() => setIsFailureModalOpen(false)}
        onConfirm={handleFailureConfirm}
      >
        <p>로그인에 실패했습니다.</p>
      </PopupModal>
    </LoginPageContainer>
  );
}

export default LoginPage;
