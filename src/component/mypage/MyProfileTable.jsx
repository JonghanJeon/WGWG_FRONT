import React, { useEffect, useState } from "react";
import { client } from "../../libs/api";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

const MyProfileTable = () => {
  const [userData, setUserData] = useState(null);
  const userSeq = sessionStorage.getItem("userSeq");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        
        const requestBody = {
          userSeq: userSeq,
        };

        const response = await client.post(`/users/read`, requestBody);

        if (response.status === 200 && response.data.success) {
          setUserData(response.data.data);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error while fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleDeleteUser = async () => {
    try {
      const response = await client.delete(`/users/delete/${userSeq}`);

      if (response.status === 200 && response.data.success) {
        alert("회원 탈퇴되었습니다.");
        sessionStorage.removeItem("userSeq");
        sessionStorage.removeItem("nickName");
        navigate("/");
      } else {
        console.error("회원 탈퇴에 실패했습니다.");
      }
    } catch (error) {
      alert("서버 오류");
    }
  };

  const handleUpdateUser = async () => {
    const newPassword = document.getElementById("newPassword").value;
    const newPasswordCheck = document.getElementById("newPasswordCheck").value;

    if(newPassword === newPasswordCheck){
      try{
        const requestBody = {
          userSeq: userSeq,
          password: newPassword
        };
        const response = await client.post(`/users/update`, requestBody);

        if (response.status === 200 && response.data.success) {
          alert("비밀번호 변경이 완료되었습니다.");
        } 
        else {
          alert("비밀번호 변경이 실패했습니다.");
        }
      } catch (error) {
        alert("서버 오류");
      }
    }
    else {
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
    }
  };

  return (
    <>
      <MyProfileArea>
        <MainName>프로필</MainName>

        <Division>
          <WithdrawalButton onClick={handleDeleteUser}>탈퇴하기</WithdrawalButton>
          <DivideLine />
        </Division>

        <Infos>
          {userData ? (
            <>
              <Info>
                <InfoLabel>이름</InfoLabel>
                <InfoContent>{userData.userName}</InfoContent>
              </Info>
              <Info>
                <InfoLabel>닉네임</InfoLabel>
                <InfoContent>{userData.nickName}</InfoContent>
              </Info>
              <Info>
                <InfoLabel>이메일</InfoLabel>
                <InfoContent>{userData.email}</InfoContent>
              </Info>
              <Info>
                <InfoLabel>비밀번호</InfoLabel>
                <InfoContent>
                  <InputPassword id="newPassword" type="password" placeholder="비밀번호를 입력해주세요." />
                </InfoContent>
              </Info>
              <Info>
                <InfoLabel>비밀번호 확인</InfoLabel>
                <InfoContent>
                  <InputPassword id="newPasswordCheck" type="password" placeholder="비밀번호를 입력해주세요." />
                </InfoContent>
              </Info>
              <UpdateButton onClick={handleUpdateUser}>비밀번호 변경</UpdateButton>
            </>
          ) : (
            <h3>Loading user data...</h3>
          )}
        </Infos>
      </MyProfileArea>
    </>
  );
};

export default MyProfileTable;

const MainName= styled.div`
  color: #595B5D;
  text-align: center;
  font-family: Ubuntu;
  font-size: 48px;
  font-style: normal;
  font-weight: 700;
  line-height: 16px; 
  margin: 5rem 5rem 4rem 5rem;
`;

const Division = styled.div`
  margin: 0;
  width: 95%
`;

const DivideLine = styled.hr`
  border: none;
  border-top: 1px solid #000;
  margin-bottom: 2rem;
`;

const MyProfileArea = styled.div`
  border-radius: 1.25rem;
  background-color: white;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
  padding: 0.5rem;
  margin: 1.5rem;
  z-index: 2;
  position: absolute;
  left: 25%;
  width: 65%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const WithdrawalButton = styled.button`
  color: #E1E1E1;
  text-align: center;
  font-family: Ubuntu;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 1rem; 
  text-decoration-line: underline;
  background-color: transparent;
  border: none;
  margin-left: auto;
`;

const Infos = styled.div`
  width: 60%;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10rem; 
`;

const InfoLabel = styled.h3`
  color: #000;
  text-align: center;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px; /* 66.667% */
  
`;

const InfoContent = styled.span`
  color: #000;
  text-align: center;
  font-family: Ubuntu;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 66.667% */
`;

const InputPassword = styled.input`
  display: flex;
  padding: 14px 16px;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  border-radius: 6px;
  border: 1px solid var(--gray-300, #DEE2E6);
  background: var(--default-white, #FFF);
  width: 15rem;
  height:1.25rem;
`;

const UpdateButton = styled.button`
  border-radius: 1rem;
  background: rgba(31, 119, 255, 0.88);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border:none;
  width: 13.75rem;
  height: 3.5rem;
  color: #FFF;
  font-size: 24px;
  font-weight: 700;
  margin: 2rem auto;
  display: block;
`;