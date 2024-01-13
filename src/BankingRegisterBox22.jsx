import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import Dropdown from "react-bootstrap/Dropdown";

// 스타일된 컴포넌트 생성
const BankingBox = styled.div`
  max-width: 40rem;
  margin: 50px auto;
  padding: 40px;
  border-radius: 1.5rem;
  text-align: center;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2); /* 그림자 효과 추가 */

  // border: 1px solid #ccc;
  // background-color: #f9f9f9;
`;

const SectionTitle = styled.h2`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 2.8rem;
  text-align: center;
  padding: 1rem;
  color: #595b5d;
`;

const HorizontalLine = styled.hr`
  border-top: 3px solid;
  margin: 1rem 0 3rem 0;
`;

const FormLabel = styled.label`
  display: block;
  padding: 1rem 0 1rem 5rem;
  margin: 0; /* 추가 */
`;

const FormItem = styled.div`
  display: flex; /* 가로로 배치 */
  align-items: center; /* 세로 가운데 정렬 */
  margin-bottom: 15px;
  // text-align: left;
`;

const FormControl = styled.div`
  display: flex; /* 추가 */
  flex: auto;
  padding: 0rem 3rem;
  text-align: center;
  flex-direction: column;
`;

const TextInput = styled.input`
  flex: 2; /* 입력창 영역을 확장하여 채우기 */
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin: 5px 0; /* 위아래 여백 추가 */
  /* 연한 테두리 추가 */
  border-color: #ddd;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
  text-align: center;
  margin: 5px 0; /* 위아래 여백 추가 */
  /* 연한 테두리 추가 */
  border-color: #ddd;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
`;

const SelectBox = styled.select`
  flex: 2; /* Select Box 영역을 확장하여 채우기 */
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin: 5px 0; /* 위아래 여백 추가 */
  /* 연한 테두리 추가 */
  border-color: #ddd;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);

  /* placeholder에 해당하는 스타일 */
  & > option[value=""][disabled] {
    display: none !important;
    color: gray !important;
  }
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 15px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.2s;
  text-align: center;

  &:hover {
    background-color: #0056b3;
  }
`;

function BankingRegisterBox() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(
    new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000)
  );
  const [challengeName, setChallengeName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [challengeDescription, setChallengeDescription] = useState("");
  const [BankingType, setBankingType] = useState(""); // 추가된 부분: Challenge Type을 선택하는 State

  const handleStartDateChange = (date) => {
    setStartDate(date);
    setEndDate(new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000));
  };

  const handleChallengeSubmit = () => {
    // 여기에서 챌린지를 만들거나 데이터를 서버로 전송하는 로직을 추가하세요.
    console.log({
      challengeName,
      startDate,
      endDate,
      targetAmount,
      depositAmount,
      challengeDescription,
    });
  };

  return (
    <BankingBox>
      <SectionTitle>가계부 등록</SectionTitle>
      <HorizontalLine />

      <FormItem>
        <FormLabel>분류</FormLabel>
        <FormControl>
          <SelectBox
            value={BankingType}
            onChange={(e) => setBankingType(e.target.value)}
          >
            {/* option 태그들 */}
          </SelectBox>
        </FormControl>
      </FormItem>

      <FormItem>
        <FormLabel>챌린지 이름</FormLabel>
        <FormControl>
          <TextInput
            type="text"
            value={challengeName}
            onChange={(e) => setChallengeName(e.target.value)}
          />
        </FormControl>
      </FormItem>

      <FormItem>
        <FormLabel>시작일</FormLabel>
        <FormControl>
          <DatePicker selected={startDate} onChange={handleStartDateChange} />
        </FormControl>
      </FormItem>

      <FormItem>
        <FormLabel>종료일</FormLabel>
        <FormControl>
          <TextInput type="text" value={endDate.toDateString()} readOnly />
        </FormControl>
      </FormItem>

      <FormItem>
        <FormLabel>목표금액</FormLabel>
        <FormControl>
          <TextInput
            type="text"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
          />
        </FormControl>
      </FormItem>

      <FormItem>
        <FormLabel>보증금</FormLabel>
        <FormControl>
          <TextInput
            type="text"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
          />
        </FormControl>
      </FormItem>

      <FormItem>
        <FormLabel>챌린지 설명</FormLabel>
        <FormControl>
          <TextArea
            value={challengeDescription}
            onChange={(e) => setChallengeDescription(e.target.value)}
          />
        </FormControl>
      </FormItem>

      <SubmitButton onClick={handleChallengeSubmit}>챌린지 만들기</SubmitButton>
    </BankingBox>
  );
}

export default BankingRegisterBox;
