import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function getCurrentFormattedTime() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');
  const hours = currentDate.getHours().toString().padStart(2, '0');
  const minutes = currentDate.getMinutes().toString().padStart(2, '0');
  const seconds = currentDate.getSeconds().toString().padStart(2, '0');
  const milliseconds = currentDate.getMilliseconds().toString().padStart(3, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
}

export default function CoffeeChallengePayment({ challengeName, coffeeMoney,onPaymentSubmit }) {
  const navigate = useNavigate();
  const [challengeTitle, setChallengeTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const {challengeId} = useParams(0);

  useEffect(()=>{
    const a = document.createElement("script");
    a.src = "https://cdn.iamport.kr/v1/iamport.js";
    const jquery = document.createElement("script");
    jquery.src = "https://code.jquery.com/jquery-1.12.4.min.js";
    const iamport = document.createElement("script");
    iamport.src = "https://cdn.iamport.kr/js/iamport.payment-1.2.0.js"
    document.head.appendChild(a);
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);

    axios.get(`http://localhost:9000/challenges/read/coffee/${challengeId}`).then(res => {
        setChallengeTitle((current) => res.data.data.title);
        setAmount((current) => res.data.data.savingAmount);
    }).catch(err => {
        console.error("API 호출 오류 : "+ err);
    });

    return () => {
      document.head.removeChild(a);
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    }
  }, [])

  const today = new Date();
  var hours = today.getHours(); // 시
  var minutes = today.getMinutes();  // 분
  var seconds = today.getSeconds();  // 초
  var milliseconds = today.getMilliseconds();
  var makeMerchantUid = `${hours}` + `${minutes}` + `${seconds}` + `${milliseconds}`;

  const { IMP } = window;

  const handlePaymentSubmit = async (e) => {
    // 결제 로직을 처리하고 데이터를 서버로 전송하는 부분
    e.preventDefault()
    IMP.init('imp23045755');
    IMP.request_pay({
      pg: 'kakaopay.TC0ONETIME', // PG사 코드표에서 선택
      pay_method: 'card', // 결제 방식
      merchant_uid: "IMP" + makeMerchantUid, // 결제 고유 번호
      name: '(주)WGWG주식회사 '+ challengeTitle +' 챌린지 보증금', // 제품명
      amount: amount, // 가격
      //구매자 정보 ↓
      // buyer_email: `test@wgwg.com`,
      buyer_name: sessionStorage.getItem("nickName"), // 구매자 이름 sessionStorage.getItem("nickName");
      // buyer_tel : '010-1234-5678',
      // buyer_addr : '서울특별시 강남구 삼성동',
      // buyer_postcode : '123-456'
    }, async function (rsp){
      if(rsp.success){
        console.log("COFFEE 챌린지 결제 성공!!");
        const formattedTime = getCurrentFormattedTime();
        const inputType = "적금액";
        const BankingInsertRequestDTO = {
            userSeq: sessionStorage.getItem("userSeq"),
            type: inputType,
            amount: amount,
            bankingDate: formattedTime,
            category: "챌린지",
            content: challengeTitle+" 챌린지",
            challengeId : challengeId
        }
        // // Logic
        axios.post("http://localhost:9000/payment/coffee/update/success", {
          challengeId : parseFloat(challengeId),
          userSeq : sessionStorage.getItem("userSeq") // 유저 ID
        }).then(res => {
          console.log(res);
        });
        axios.post("http://localhost:9000/payment/update/totalamount", {
          challengeId : parseFloat(challengeId),
          challengeType : "COFFEE",
          amount : amount
        }).then(res => {
          console.log(res);
        });
        axios.post("http://localhost:9000/banking/insert", BankingInsertRequestDTO)
          .then(res => {
            console.log(res);
          }).catch(err => {
            console.log(err);
          });
        console.log(rsp);
        alert("결제성공!");
        navigate(`/challenges/detail/${challengeId}/COFFEE`);
      }else{
        alert("결제 실패");
      }
    });
  };

  return (
      <>
        <ParticipateBox>
            <SectionTitle>커피 챌린지 결제페이지</SectionTitle>
            <hr />
            <ChallengeInfo>
                <ChallengeName>챌린지 이름: {challengeTitle}</ChallengeName>
                <CoffeeMoney>커피금액: {amount}</CoffeeMoney>
                <InfoText1>챌린지 성공 시 실패한 사람들의 커피금액을 분배받을 수 있습니다.</InfoText1>
                <InfoText2>(하루라도 실패할 시, 입금했던 <Underline>모든 커피 금액이 몰수</Underline>되므로 주의하시길 바랍니다.)</InfoText2>
            </ChallengeInfo>
            <SubmitButton onClick={handlePaymentSubmit}>결제하기</SubmitButton>
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
`;

const CoffeeMoney = styled.div`
    font-weight: bold;
    margin-bottom: 5px;
`;

const InfoText1 = styled.div`
    font-size: 13px;
`;

const Underline = styled.span`
  text-decoration: underline;
`;

const InfoText2 = styled.div`
  color: red;
  font-size: 13px;
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
  margin-top: 0px;

  &:hover {
    background-color: #0056b3;
  }
`;

