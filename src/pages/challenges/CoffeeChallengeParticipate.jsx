import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CoffeeChallengeParticipate({ challengeName, onPaymentSubmit }) {
  const navigate = useNavigate();
  const [bank, setBank] = useState('국민은행');
  const [accountNumber, setAccountNumber] = useState('');
  const [challengeTitle, setChallengeTitle] = useState("");
  const {challengeId} = useParams(0);

  useEffect(()=>{
    axios.get(`http://localhost:9000/challenges/read/coffee/${challengeId}`).then(res => {
        setChallengeTitle((current) => res.data.data.title);
    }).catch(err => {
        console.error("API 호출 오류 : "+ err);
    });
  }, [])

  const handlePaymentSubmit = () => {
    // 결제 로직을 처리하고 데이터를 서버로 전송하는 부분
    axios.post(`http://localhost:9000/challenges/participate/coffee`,{
      challengeId : challengeId,
      userSeq: sessionStorage.getItem("userSeq"),
      account : accountNumber,
      bankName : bank,
      challengeType : "COFFEE"
    }).then(res => {
      if(res.data.success){
        console.log(res.data.data);
        alert("성공적으로 참여되었습니다!");
        navigate(`/challenges/detail/${challengeId}/COFFEE`);
      }else{
        alert("참여 실패하였습니다");
      }
    }).catch(err => {
      console.error("API 호출 오류 : "+ err);
    })
  };

  return (
      <>
        <ParticipateBox>
            <SectionTitle>챌린지 참여 신청</SectionTitle>
            <hr />
            <ChallengeInfo>
                <ChallengeName>챌린지 이름: {challengeTitle}</ChallengeName>
                <InfoText2>챌린지 성공 시 <Underline>리워드를 환급</Underline>받으실 계좌 정보를 한단에 입력해주세요.</InfoText2>
                <InfoText3>(계좌정보는 수정이 불가능하니, <RedText>정확하게 입력해주세요</RedText>)</InfoText3>
            </ChallengeInfo>
            <BankSelect>
                <BankLabel>환급 계좌</BankLabel>
                <BankSelectBox
                value={bank}
                onChange={(e) => setBank(e.target.value)}
                >
                <option value="국민은행">국민은행</option>
                <option value="우리은행">우리은행</option>
                <option value="신한은행">신한은행</option>
                <option value="하나은행">하나은행</option>
                </BankSelectBox>
            </BankSelect>
            <AccountNumber>
                <AccountLabel>환급 계좌 번호</AccountLabel>
                <AccountInput
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="계좌번호를 입력하세요."
                />
            </AccountNumber>
            <SubmitButton onClick={handlePaymentSubmit}>신청하기</SubmitButton>
        </ParticipateBox>
      </>
    
  );
}

const ParticipateBox = styled.div`
    width: 600px; /* 최대 너비를 600px로 설정 */
    margin: 0 auto;
    border: 1px solid #ccc;
    background-color:rgba(230, 222, 222, 0.199) ;
    border-radius: 15%;
    box-shadow:0px2px4pxrgba(0,0,0,0.2) ; 
    padding: 2% 3%;
    text-align:center ;
    box-shadow:0px 7px 10px rgba(0, 0, 0, 0.5) ;
    /* 화면 크기에 따른 반응형 설정 */
    @media (max-width: 600px) {
    padding: 10px; /* 화면이 작을 때 padding 값을 줄임 */
    }
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const ChallengeInfo = styled.div`
  margin: 20px 0 40px 0;
  
`;

const ChallengeName = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
  margin-top: 40px;
`;

const InfoText2 = styled.div`
  position: relative;
  margin-bottom: 5px;
  margin-top: 30px;
`;

const Underline = styled.span`
  text-decoration: underline;
`;

const InfoText3 = styled.div`
  color: red;
  font-size: 13px;
`;

const RedText = styled.span`
  color: red;
`;

const BankSelect = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  margin-top: 70px;
`;

const BankLabel = styled.label`
  flex: 1;
`;

const BankSelectBox = styled.select`
  flex: 2;
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const AccountNumber = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  margin-top: 70px;

`;

const AccountLabel = styled.label`
  flex: 1;
`;

const AccountInput = styled.input`
  flex: 2;
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;
 
const SubmitButton = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 12px 20px; /* 버튼의 크기 조정 */
  font-size: 18px; /* 버튼 글자의 크기 조정 */
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.2s;
  text-align: center;
  margin-top: 40px;

  &:hover {
    background-color: #0056b3;
  }
`;

