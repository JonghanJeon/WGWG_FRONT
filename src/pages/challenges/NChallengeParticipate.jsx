import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Navigator from '../../component/common/Navigator';

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

export default function NChallengeParticipate() {
  const navigate = useNavigate();
  const [bank, setBank] = useState('국민은행');
  const [accountNumber, setAccountNumber] = useState('');
  const [challengeTitle, setChallengeTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const {challengeId} = useParams(0);

  const today = new Date();
  var hours = today.getHours(); // 시
  var minutes = today.getMinutes();  // 분
  var seconds = today.getSeconds();  // 초
  var milliseconds = today.getMilliseconds();
  var makeMerchantUid = `${hours}` + `${minutes}` + `${seconds}` + `${milliseconds}`;

  const { IMP } = window;

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
    
    axios.get(`http://localhost:9000/challenges/read/n/${challengeId}`).then(res => {
      setChallengeTitle((current) => res.data.data.title);
      setAmount((current) => res.data.data.deposit);
    }).catch(err => {
        console.error("API 호출 오류 : "+ err);
    });

    return () => {
      document.head.removeChild(a);
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    }
  }, [])


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
      buyer_name: "test", // 구매자 이름 sessionStorage.getItem("nickName");
      // buyer_tel : '010-1234-5678',
      // buyer_addr : '서울특별시 강남구 삼성동',
      // buyer_postcode : '123-456'
    }, async function (rsp){
      if(rsp.success){ // 결제 성공시
        // 결제 성공시 해야할 일
        console.log("N 챌린지 결제 성공!!");
        // Logic
        // 참여자 등록
        axios.post("http://localhost:9000/challenges/participate/n", {
          challengeId : challengeId,
          userSeq: sessionStorage.getItem("userSeq"), // sessionStorage;
          account : accountNumber,
          bankName: bank,
          challengeType : "N"
        }).then(res => {
                if(res.data.success){ // 참여 성공시
                  // 보증금 합산
                  axios.post("http://localhost:9000/payment/update/totalamount", {
                    challengeId : challengeId,
                    challengeType : "N",
                    amount : amount
                  }).then(res => {
                    console.log(res);
                  });
                  // 뱅킹 등록
                  const formattedTime = getCurrentFormattedTime();
                  const inputType = "보증금";
                  const BankingInsertRequestDTO = {
                    userSeq: sessionStorage.getItem("userSeq"), // sessionStorage.getItem("userSeq");
                    type: inputType,
                    amount: amount,
                    bankingDate: formattedTime,
                    category: "챌린지",
                    content: challengeTitle + "챌린지",
                    challengeId : challengeId
                  }
                  axios.post("http://localhost:9000/banking/insert", BankingInsertRequestDTO)
                    .then(res => {
                        console.log(res);
                    }).catch(err => {
                    console.log(err);
                  });
                  console.log(rsp);
                  alert("결제성공!");
                  navigate(`/challenges/detail/${challengeId}/N`);
                }else {
                  console.log("아 왜안되노 아 왜안되노 아 왜안되노 아 왜안되노 아 왜안되노 아 왜안되노 아 왜안되노 아 왜안되노 아 왜안되노 아 왜안되노 ");
                }
            }).catch(err => {
                console.log(err);
            });
      }else if (rsp.success == false){ // 결제 실패시
          // 결제 실패시 해야할 일
          alert("결제실패");
          alert(rsp.error_msg);
      }
    });
  };

  return (
      <>
        <ParticipateBox>
            <SectionTitle>챌린지 참여 신청</SectionTitle>
            <hr />
            <ChallengeInfo>
                <ChallengeName>챌린지 이름: {challengeTitle}</ChallengeName>
                <Deposit>보증금: {amount}원</Deposit>
                <InfoText1>(보증금을 납부하시면 자동으로 챌린지에 참여됩니다)</InfoText1>
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

const Deposit = styled.div`
  margin-bottom: 5px;
  font-weight: bold;
`;

const InfoText1 = styled.div`
  font-size: 14px;
  color: #555;
  margin-top: 10px;
  margin-bottom: 30px;
`;

const InfoText2 = styled.div`
  position: relative;
  margin-bottom: 5px;
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
  margin-top: 50px;
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

