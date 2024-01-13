import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import axios, { Axios } from 'axios';
import { useNavigate } from 'react-router-dom';

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

export default function NChallengeInsertBox({}) {
  const navigate = useNavigate();

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate()+1);

  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState(tomorrow);
  const [endDate, setEndDate] = useState(new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000));
  const [limitAmount, setLimitAmount] = useState('');
  const [deposit, setDeposit] = useState('');
  const [description, setDescription] = useState('');
  const[account, setAccount] = useState('');  
  const[bankName, setBankName] = useState('국민은행');

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

    return () => {
      document.head.removeChild(a);
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    }
  }, [])


  const handleStartDateChange = (date) => {
    date.setHours(9,0,0,0);
    setStartDate(date);
    setEndDate(new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000));
  };

  // 날짜 하루 앞당기기 
  const previousDay = new Date(endDate);
  previousDay.setDate(previousDay.getDate() - 1);


  const handleChallengeSubmit = async (e) => {
    e.preventDefault()
    IMP.init('imp23045755');
    IMP.request_pay({
      pg: 'kakaopay.TC0ONETIME', // PG사 코드표에서 선택
      pay_method: 'card', // 결제 방식
      merchant_uid: "IMP" + makeMerchantUid, // 결제 고유 번호
      name: '(주)WGWG주식회사 '+ title +' 챌린지 보증금', // 제품명
      amount: deposit, // 가격
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
        axios.post("http://localhost:9000/challenges/insert/n", {
          ownerId: sessionStorage.getItem("userSeq"), // localStorage.getItem("userSeq");
          title:title,
          startDate:startDate,
          limitAmount: parseInt(limitAmount),
          deposit: parseInt(deposit),
          description:description,
          account:account,
          bankName:bankName,
          challengeType: "N"
        }).then(res => {
                if(res.data.success){ // 참여 성공시
                  // 보증금 합산
                  axios.post("http://localhost:9000/payment/update/totalamount", {
                    challengeId : res.data.data.challengeId,
                    challengeType : "N",
                    amount : deposit
                  }).then(res => {
                    console.log(res);
                  });

                  // 뱅킹 등록
                  const formattedTime = getCurrentFormattedTime();
                  const inputType = "보증금";
                  const BankingInsertRequestDTO = {
                    userSeq: sessionStorage.getItem("userSeq"), // sessionStorage.getItem("userSeq");
                    type: inputType,
                    amount: deposit,
                    bankingDate: formattedTime,
                    category: "챌린지",
                    content: title + "챌린지",
                    challengeId : res.data.data.challengeId
                  }
                  axios.post("http://localhost:9000/banking/insert", BankingInsertRequestDTO)
                    .then(res => {
                        console.log(res);
                    }).catch(err => {
                    console.log(err);
                  });
                  console.log(rsp);
                  alert("결제성공!");
                  navigate(`/challenges/detail/${res.data.data.challengeId}/N`);
                }else {
                  alert("결제 실패");
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
    <NChallengeBox>
      <SectionTitle>N원 챌린지</SectionTitle>
      <hr />
      <FormItem>
        <FormLabel>챌린지 이름</FormLabel>
        <TextInput
          type="text"
          placeholder="챌린지 이름을 입력하세요."
          value={title}
          onChange={(e) => setTitle(e.target.value)
          }
        />
      </FormItem>
      <FormItem>
        <FormLabel>시작일</FormLabel>
        <DatePicker
          dateFormat="yyyy/MM/dd"
          selected={startDate}
          onChange={handleStartDateChange}
          minDate={tomorrow} // 내일 날짜로 설정
          />
      </FormItem>
      <FormItem>
        <FormLabel>종료일</FormLabel>
        <TextInput
          type="text"
          value={previousDay.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\./g, '/').replace(/\/$/, '')}
          readOnly
        />
      </FormItem>
      <FormItem>
        <FormLabel>상한액</FormLabel>
        <TextInput
          type="text"
          placeholder="ex)50000"
          value={limitAmount}
          onChange={(e) => setLimitAmount(e.target.value)}
        />
      </FormItem>
      <FormItem>
        <FormLabel>보증금</FormLabel>
        <TextInput
          type="text"
          placeholder="ex)3000"
          value={deposit}
          onChange={(e) => setDeposit(e.target.value)}
        />
      </FormItem>
      <FormItem>
        <FormLabel>챌린지 설명</FormLabel>
        <TextArea
          value={description}
          placeholder="챌린지 설명을 입력하세요."
          onChange={(e) => setDescription(e.target.value)}
        />
      </FormItem>
      <FormItem>
        <FormLabel>환급 계좌</FormLabel>
        <BankSelectBox
        value={bankName}
        onChange={(e) => setBankName(e.target.value)}
        >
        <option value="국민은행">국민은행</option>
        <option value="우리은행">우리은행</option>
        <option value="신한은행">신한은행</option>
        <option value="하나은행">하나은행</option>
        </BankSelectBox>
      </FormItem>
      <FormItem>
        <FormLabel>환급 계좌 번호</FormLabel>
        <TextInput
        type="text"
        value={account}
        onChange={(e) => setAccount(e.target.value)}
        placeholder="계좌번호를 입력하세요."
        />
      </FormItem>
      <SubmitButton onClick={handleChallengeSubmit}>챌린지 만들기</SubmitButton>
    </NChallengeBox>
  );
}

const NChallengeBox = styled.div`
  width: 800px;
  margin: 0 auto;
  border: 1px solid #ccc;
  background-color:rgba(230, 222, 222, 0.199) ;
  border-radius: 15%;
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
  margin-top: 0px;
`;

const FormLabel = styled.label`
  display: inline-block;
  width: 120px;
  font-size:18px;
  margin-right: 10px;
`;

const FormItem = styled.div`
  display: flex; /* 가로로 배치 */
  align-items: center; /* 세로 가운데 정렬 */
  justify-content: space-between; /* 좌우 여백을 벌리기 위해 추가 */
  margin-bottom: 10px;
  margin-left: 25px;
  margin-right: 25px;
  text-align: left;
`;

const TextInput = styled.input`
  flex: 2; /* 입력창 영역을 확장하여 채우기 */
  display: flex; /* 가로로 배치 */
  align-items: center; /* 세로 가운데 정렬 */
  justify-content: flex-end; /* Right-align the components */
  width: 50px;
  padding: 8px 8px 8px 15px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin: 5px 0; /* 위아래 여백 추가 */
  /* 연한 테두리 추가 */
  border-color: #ddd;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
`;

const TextArea = styled.textarea`
  flex: 2; /* 입력창 영역을 확장하여 채우기 */

  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin: 5px 0; /* 위아래 여백 추가 */
  /* 연한 테두리 추가 */
  border-color: #ddd;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);

`;

const BankSelectBox = styled.select`
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
  margin-top: 6px;

  &:hover {
    background-color: #0056b3;
  }
`;