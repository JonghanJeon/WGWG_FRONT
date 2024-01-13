import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PopupModal from "./PopupModal";

const SignUpForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    nickName: "",
    password: "",
  });

  const [emailError, setEmailError] = useState("");
  const [emailSuccess, setEmailSuccess] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);

  const [nickNameError, setNicKNameError] = useState("");
  const [nickNameSuccess, setNicKNameSucess] = useState("");
  const [isNickNameValid, setIsNickNameValid] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const validateEmail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/users/${formData.email}/check/email`
        );
        const isValid = response.data.status === 200;
        setIsEmailValid(isValid);

        if (!isValid) {
          setEmailError("사용할 수 없는 이메일입니다.");
          setEmailSuccess("");
        } else {
          setEmailSuccess("사용 가능한 이메일입니다.");
          setEmailError("");
        }
      } catch (error) {
        setEmailError("사용할 수 없는 이메일입니다.");
        setEmailSuccess("");
      }
    };

    validateEmail();
  }, [formData.email]);

  useEffect(() => {
    const validateNickName = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/users/${formData.nickName}/check/nickname`
        );
        const isValid = response.data.status === 200;
        setIsNickNameValid(isValid);

        if (!isValid) {
          setNicKNameError("사용할 수 없는 닉네임입니다.");
          setNicKNameSucess("");
        } else {
          setNicKNameError("");
          setNicKNameSucess("사용 가능한 닉네임입니다.");
        }
      } catch (error) {
        setNicKNameError("사용할 수 없는 닉네임입니다.");
        setNicKNameSucess("");
      }
    };

    validateNickName();
  }, [formData.nickName]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      userName: formData.username,
      email: formData.email,
      nickName: formData.nickName,
      password: formData.password,
    };

    try {
      const response = await axios.post(
        "http://localhost:9000/users/insert",
        dataToSend,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("서버 응답:", response.data);
      setFormData({
        userName: "",
        email: "",
        nickName: "",
        password: "",
        confirmPassword: "",
      });
      setIsModalOpen(true);
    } catch (error) {
      console.error("서버 API 호출 오류:", error);
    }
  };

  const handleConfirm = () => {
    setIsModalOpen(false);
    navigate("/login");
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <FormTitle>회원 가입</FormTitle>
        <FormGroup>
          <Label htmlFor="username">사용자 이름</Label>
          <Input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="email">이메일</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
          {emailSuccess && <SuccessMessage>{emailSuccess}</SuccessMessage>}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="nickName">닉네임</Label>
          <Input
            type="text"
            id="nickName"
            name="nickName"
            value={formData.nickName}
            onChange={handleInputChange}
            required
          />
          {nickNameError && <ErrorMessage>{nickNameError}</ErrorMessage>}
          {nickNameSuccess && (
            <SuccessMessage>{nickNameSuccess}</SuccessMessage>
          )}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">비밀번호</Label>
          <Input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </FormGroup>
        <ButtonContainer>
          <SignUpButton
            type="submit"
            disabled={!isEmailValid || !isNickNameValid}
          >
            가입하기
          </SignUpButton>
        </ButtonContainer>
      </Form>
      <PopupModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
      >
        <p>회원가입에 성공했습니다!</p>
      </PopupModal>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const Form = styled.form`
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 350px;
`;

const FormTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 16px;
  color: #333;
  margin-bottom: 8px;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const SignUpButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;

const SuccessMessage = styled.p`
  color: green;
  font-size: 14px;
  margin-top: 5px;
`;

export default SignUpForm;
