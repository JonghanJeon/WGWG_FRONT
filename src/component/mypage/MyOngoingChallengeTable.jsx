import React, { useEffect, useState } from "react";
import { client } from "../../libs/api";
import styled from "styled-components";

// 날짜를 원하는 형식으로 변환하는 함수
function formatDateRange(startDate, endDate) {
  const options = { year: "2-digit", month: "2-digit", day: "2-digit" };
  const start = new Date(startDate).toLocaleDateString(undefined, options);
  const end = new Date(endDate).toLocaleDateString(undefined, options);
  return `${start} ~ ${end}`;
}

const Challenge = ({ challengeData }) => {
  const formattedDateRange = formatDateRange(challengeData.startDate, challengeData.endDate);

  return (
    <tr>
      <StyledTD>{challengeData.title}</StyledTD>
      <StyledTD>{formattedDateRange}</StyledTD>
      <StyledTD>{challengeData.isSuccess === 1 ? "O" : "X"}</StyledTD>
    </tr>
  );
};

const MyOngoingChallengeTable = () => {
  const [ongoingChallenges, setOngoingChallenges] = useState([]); 
  const userSeq = sessionStorage.getItem("userSeq");

  useEffect(() => {
    const requestBody = {
      userSeq: userSeq,
      status: "종료"
    };
    client.post("/read/challenges/process", requestBody) 
      .then(response => {
        const data = response.data;

        setOngoingChallenges(data);
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
      });
  }, []);

    return (
        <>       
        <ChallengeTablesWrapper>
        <TableName>
          <div dangerouslySetInnerHTML={{ __html: IconOngoing }} /> <TableNameLabel>진행 중인 챌린지</TableNameLabel>
        </TableName>
        <StyledTable>
            <thead>
                <tr>
                    <StyledTH>챌린지명</StyledTH>
                    <StyledTH>기간</StyledTH>
                    <StyledTH>시작여부</StyledTH>
                </tr>
            </thead>
            <tbody>
                {ongoingChallenges.map(challenge => <Challenge challengeData={challenge}/>)}
            </tbody>
        </StyledTable>
        </ChallengeTablesWrapper>
        </>
    );
}

export default MyOngoingChallengeTable;

const TableName  = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;
  margin: 0.5rem 2rem;
`;

const TableNameLabel = styled.span`
  color: #000;
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  stroke-width: 1px;
  stroke: #A0A0A0;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

const ChallengeTablesWrapper = styled.div`
  display: flex; 
  flex-direction: column; 
  width: 90%; 
`;

const StyledTable = styled.table`
  margin: 2rem;
  padding: 1rem;
  border: 1px solid #B9B9B9;
  border-radius: 0.5rem;
  border-collapse: collapse;
`;

const StyledTH = styled.th`
  background: rgba(0, 0, 0, 0.06);
  text-align: center;
  border: 1px solid #B9B9B9;
  width: 25%;
  height: 2.25rem;
  border-radius: 0.25rem;
`;

const StyledTD = styled.td`
  text-align: center;
  border: 1px solid #B9B9B9;
  width: 25%;
  height: 2.25rem;
`;

const IconOngoing = `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M6 2.25H4.5C3.70435 2.25 2.94129 2.56607 2.37868 3.12868C1.81607 3.69129 1.5 4.45435 1.5 5.25V21C1.5 21.7956 1.81607 22.5587 2.37868 23.1213C2.94129 23.6839 3.70435 24 4.5 24H19.5C20.2956 24 21.0587 23.6839 21.6213 23.1213C22.1839 22.5587 22.5 21.7956 22.5 21V5.25C22.5 4.45435 22.1839 3.69129 21.6213 3.12868C21.0587 2.56607 20.2956 2.25 19.5 2.25H18V3.75H19.5C19.8978 3.75 20.2794 3.90804 20.5607 4.18934C20.842 4.47064 21 4.85218 21 5.25V21C21 21.3978 20.842 21.7794 20.5607 22.0607C20.2794 22.342 19.8978 22.5 19.5 22.5H4.5C4.10218 22.5 3.72064 22.342 3.43934 22.0607C3.15804 21.7794 3 21.3978 3 21V5.25C3 4.85218 3.15804 4.47064 3.43934 4.18934C3.72064 3.90804 4.10218 3.75 4.5 3.75H6V2.25Z" fill="black"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M14.25 1.5H9.75C9.55109 1.5 9.36032 1.57902 9.21967 1.71967C9.07902 1.86032 9 2.05109 9 2.25V3.75C9 3.94891 9.07902 4.13968 9.21967 4.28033C9.36032 4.42098 9.55109 4.5 9.75 4.5H14.25C14.4489 4.5 14.6397 4.42098 14.7803 4.28033C14.921 4.13968 15 3.94891 15 3.75V2.25C15 2.05109 14.921 1.86032 14.7803 1.71967C14.6397 1.57902 14.4489 1.5 14.25 1.5ZM9.75 0C9.15326 0 8.58097 0.237053 8.15901 0.65901C7.73705 1.08097 7.5 1.65326 7.5 2.25V3.75C7.5 4.34674 7.73705 4.91903 8.15901 5.34099C8.58097 5.76295 9.15326 6 9.75 6H14.25C14.8467 6 15.419 5.76295 15.841 5.34099C16.2629 4.91903 16.5 4.34674 16.5 3.75V2.25C16.5 1.65326 16.2629 1.08097 15.841 0.65901C15.419 0.237053 14.8467 0 14.25 0L9.75 0Z" fill="black"/>
  <path d="M6 16.5C6 16.1022 6.15804 15.7206 6.43934 15.4393C6.72064 15.158 7.10218 15 7.5 15C7.89782 15 8.27936 15.158 8.56066 15.4393C8.84196 15.7206 9 16.1022 9 16.5V18C9 18.3978 8.84196 18.7794 8.56066 19.0607C8.27936 19.342 7.89782 19.5 7.5 19.5C7.10218 19.5 6.72064 19.342 6.43934 19.0607C6.15804 18.7794 6 18.3978 6 18V16.5ZM15 10.5C15 10.1022 15.158 9.72064 15.4393 9.43934C15.7206 9.15804 16.1022 9 16.5 9C16.8978 9 17.2794 9.15804 17.5607 9.43934C17.842 9.72064 18 10.1022 18 10.5V18C18 18.3978 17.842 18.7794 17.5607 19.0607C17.2794 19.342 16.8978 19.5 16.5 19.5C16.1022 19.5 15.7206 19.342 15.4393 19.0607C15.158 18.7794 15 18.3978 15 18V10.5ZM10.5 13.5C10.5 13.1022 10.658 12.7206 10.9393 12.4393C11.2206 12.158 11.6022 12 12 12C12.3978 12 12.7794 12.158 13.0607 12.4393C13.342 12.7206 13.5 13.1022 13.5 13.5V18C13.5 18.3978 13.342 18.7794 13.0607 19.0607C12.7794 19.342 12.3978 19.5 12 19.5C11.6022 19.5 11.2206 19.342 10.9393 19.0607C10.658 18.7794 10.5 18.3978 10.5 18V13.5Z" fill="black"/>
  </svg>
`;
