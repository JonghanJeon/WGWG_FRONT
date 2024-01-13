import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import axios, { Axios } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function CoffeeChallengeInsertBox({}) {
  const navigate = useNavigate();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate()+1);
  tomorrow.setHours(9,0,0,0);

  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState(tomorrow);
  const [endDate, setEndDate] = useState(tomorrow);
  const [savingAmount, setSavingAmount] = useState('');
  const [account, setAccount] = useState('');
  const [description, setDescription] = useState('');
  const[bankName, setBankName] = useState('국민은행');

  const updatedEndDate = new Date(endDate);
  updatedEndDate.setDate(updatedEndDate.getDate() + 1);


  const handleStartDateChange = (date) => {
    date.setHours(9,0,0,0);
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    date.setHours(9,0,0,0);
    setEndDate(date);
  };

  const handleChallengeSubmit = () => {
    axios.post('http://localhost:9000/challenges/insert/coffee',{
      ownerId: 1,
      title:title,
      startDate:startDate,
      endDate:updatedEndDate,
      description:description,
      savingAmount:parseInt(savingAmount),
      account:account,
      bankName:bankName,
      challengeType: "COFFEE",
    }).then(res => {
      if(res.data.success){
        // 챌린지 생성 성공
        console.log('챌린지가 성공적으로 생성되었습니다.');
        console.log(res.data.data);
        // 추가로 필요한 작업 수행
        alert("챌린지가 생성되었습니다!");
        navigate(`/challenges/detail/${res.data.data.challengeId}/COFFEE`);
      }else {
        // 챌린지 생성 실패
        console.error('챌린지 생성에 실패했습니다.');
      }
    }).catch(err => {
      console.error("API 호출 오류 : "+ err);
    })
  };

  return (
    <CoffeeChallengeBox>
      <SectionTitle>Coffee 챌린지</SectionTitle>
      <hr />
      <FormItem>
        <FormLabel>챌린지 이름</FormLabel>
        <TextInput
          type="text"
          placeholder="챌린지 이름을 입력하세요."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </FormItem>
      <FormItem>
        <FormLabel>시작일</FormLabel>
        <DatePicker
          dateFormat="yyyy/MM/dd"
          selected={startDate}
          onChange={handleStartDateChange}
          selectsStart
          minDate={tomorrow}
          startDate={startDate}
          endDate={endDate}
        />
      </FormItem>
      <FormItem>
        <FormLabel>종료일</FormLabel>
        <DatePicker
          dateFormat="yyyy/MM/dd"
          selected={endDate}
          onChange={handleEndDateChange}
          selectsEnd
          minDate={startDate}
          startDate={startDate}
          endDate={endDate}
        />
      </FormItem>
      <FormItem>
        <FormLabel>적립액</FormLabel>
        <TextInput
          type="text"
          placeholder="ex)4500"
          value={savingAmount}
          onChange={(e) => setSavingAmount(e.target.value)}
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
    </CoffeeChallengeBox>
  );
}

// 스타일된 컴포넌트 생성
const CoffeeChallengeBox = styled.div`
    width: 800px;
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
  margin-top: 0px;
`;

const FormLabel = styled.label`
  /* 이전 스타일 */
  display: inline-block;
  width: 120px;
  font-size:18px;
  margin-right: 10px;
`;
const FormItem = styled.div`
  display: flex; /* 가로로 배치 */
  align-items: center; /* 세로 가운데 정렬 */
  justify-content: space-between; /* 좌우 여백을 벌리기 위해 추가 */
  margin-bottom: 20px;
  margin-left: 25px;
  margin-right: 25px;
  text-align: left;
`;

const TextInput = styled.input`
  flex: 2; /* 입력창 영역을 확장하여 채우기 */
  width: 100%; /* 공통된 너비를 설정 */
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin: 5px 0; /* 위아래 여백 추가 */
  /* 연한 테두리 추가 */
  border-color: #ddd;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
  /* Placeholder 스타일링 */
  &::placeholder {
    color: #bbb; 
  }
`;

const TextArea = styled.textarea`
  flex: 2; /* 입력창 영역을 확장하여 채우기 */
  width: 100%; /* 공통된 너비를 설정 */
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin: 5px 0; /* 위아래 여백 추가 */
  /* 연한 테두리 추가 */
  border-color: #ddd;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
  /* Placeholder 스타일링 */
  &::placeholder {
    color: #bbb; 
  }
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
    margin-top: 0px;
    margin-bottom: px;

    &:hover {
    background-color: #0056b3;
    }
`;