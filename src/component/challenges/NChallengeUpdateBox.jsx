import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import axios, { Axios } from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function NChallengeUpdateBox({}) {
  const navigate = useNavigate();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate()+1);
  tomorrow.setHours(9,0,0,0);

  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState(tomorrow);
  const [endDate, setEndDate] = useState(new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000));
  const [limitAmount, setLimitAmount] = useState('');
  const [description, setDescription] = useState('');
  const {challengeId} = useParams(0);
  const {challengeType} = useParams("");

  const handleStartDateChange = (date) => {
    date.setHours(9,0,0,0);
    setStartDate(date);
    setEndDate(new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000));
  };

  // 날짜 하루 앞당기기 
  const previousDay = new Date(endDate);
  previousDay.setDate(previousDay.getDate() - 1);


  const handleChallengeSubmit = async (e) => {
    axios.post('http://localhost:9000/challenges/update/n',{
      challengeId: challengeId,//수정필요 
      title:title,
      description:description,
      startDate:startDate,
      limitAmount: parseInt(limitAmount),
    }).then(res => {
      if(res.data.success){
        // 챌린지 생성 성공
        alert('챌린지가 성공적으로 수정되었습니다!');
        console.log(res.data.data);
        // 추가로 필요한 작업 수행
        navigate(`/challenges/detail/${challengeId}/${challengeType}`);
      }else{
        // 챌린지 생성 실패
        console.log(e.response)
        console.error('챌린지 생성에 실패했습니다.');
      }
    }).catch(err => {
      console.error("API 호출 오류 : "+ err);
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
        <FormLabel>챌린지 설명</FormLabel>
        <TextArea
          value={description}
          placeholder="챌린지 설명을 입력하세요."
          onChange={(e) => setDescription(e.target.value)}
        />
      </FormItem>
      <SubmitButton onClick={handleChallengeSubmit}>챌린지 수정하기</SubmitButton>
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
  font-size:18px;
  margin-right: 10px;
  margin-top: 0px;
  width: 120px;
`;

const FormItem = styled.div`
  display: flex; /* 가로로 배치 */
  align-items: center; /* 세로 가운데 정렬 */
  justify-content: space-between; /* 좌우 여백을 벌리기 위해 추가 */
  margin-bottom: 10px;
  margin-left: 25px;
  margin-right: 25px;
  margin-top:20px;
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