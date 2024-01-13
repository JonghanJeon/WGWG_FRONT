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
      <StyledTD>{challengeData.reward}</StyledTD>
    </tr>
  );
};

const MyFinishedChallengeTable = () => {
    const [finishedChallenges, setFinishedChallenges] = useState([]); 
    const userSeq = sessionStorage.getItem("userSeq");

    useEffect(() => {
      const requestBody = {
        userSeq: userSeq,
        status: "종료"
      };
      client.post("/read/challenges/complete", requestBody) 
        .then(response => {
          const data = response.data;

          setFinishedChallenges(data);
        })
        .catch(error => {
          console.error("Error fetching data: ", error);
        });
    }, []);

    return (
        <>       
        <ChallengeTablesWrapper>
        <TableName>
          <div dangerouslySetInnerHTML={{ __html: IconFinished }} /> <TableNameLabel>완료한 챌린지</TableNameLabel>
        </TableName>
        <StyledTable>
            <thead>
                <tr>
                    <StyledTH>챌린지명</StyledTH>
                    <StyledTH>기간</StyledTH>
                    <StyledTH>성공여부</StyledTH>
                    <StyledTH>리워드</StyledTH>
                </tr>
            </thead>
            <tbody>
                {finishedChallenges.map(challenge => <Challenge challengeData={challenge}/>)}
            </tbody>
        </StyledTable>
        </ChallengeTablesWrapper>
        </>
    );
}

export default MyFinishedChallengeTable;

const TableName  = styled.div`
  display: flex;
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

const IconFinished = `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M6 2.25H4.5C3.70435 2.25 2.94129 2.56607 2.37868 3.12868C1.81607 3.69129 1.5 4.45435 1.5 5.25V21C1.5 21.7956 1.81607 22.5587 2.37868 23.1213C2.94129 23.6839 3.70435 24 4.5 24H19.5C20.2956 24 21.0587 23.6839 21.6213 23.1213C22.1839 22.5587 22.5 21.7956 22.5 21V5.25C22.5 4.45435 22.1839 3.69129 21.6213 3.12868C21.0587 2.56607 20.2956 2.25 19.5 2.25H18V3.75H19.5C19.8978 3.75 20.2794 3.90804 20.5607 4.18934C20.842 4.47064 21 4.85218 21 5.25V21C21 21.3978 20.842 21.7794 20.5607 22.0607C20.2794 22.342 19.8978 22.5 19.5 22.5H4.5C4.10218 22.5 3.72064 22.342 3.43934 22.0607C3.15804 21.7794 3 21.3978 3 21V5.25C3 4.85218 3.15804 4.47064 3.43934 4.18934C3.72064 3.90804 4.10218 3.75 4.5 3.75H6V2.25Z" fill="black"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M14.25 1.5H9.75C9.55109 1.5 9.36032 1.57902 9.21967 1.71967C9.07902 1.86032 9 2.05109 9 2.25V3.75C9 3.94891 9.07902 4.13968 9.21967 4.28033C9.36032 4.42098 9.55109 4.5 9.75 4.5H14.25C14.4489 4.5 14.6397 4.42098 14.7803 4.28033C14.921 4.13968 15 3.94891 15 3.75V2.25C15 2.05109 14.921 1.86032 14.7803 1.71967C14.6397 1.57902 14.4489 1.5 14.25 1.5ZM9.75 0C9.15326 0 8.58097 0.237053 8.15901 0.65901C7.73705 1.08097 7.5 1.65326 7.5 2.25V3.75C7.5 4.34674 7.73705 4.91903 8.15901 5.34099C8.58097 5.76295 9.15326 6 9.75 6H14.25C14.8467 6 15.419 5.76295 15.841 5.34099C16.2629 4.91903 16.5 4.34674 16.5 3.75V2.25C16.5 1.65326 16.2629 1.08097 15.841 0.65901C15.419 0.237053 14.8467 0 14.25 0L9.75 0ZM16.281 10.719C16.3508 10.7887 16.4063 10.8714 16.4441 10.9625C16.4819 11.0537 16.5013 11.1513 16.5013 11.25C16.5013 11.3487 16.4819 11.4463 16.4441 11.5375C16.4063 11.6286 16.3508 11.7113 16.281 11.781L11.781 16.281C11.7113 16.3508 11.6286 16.4063 11.5375 16.4441C11.4463 16.4819 11.3487 16.5013 11.25 16.5013C11.1513 16.5013 11.0537 16.4819 10.9625 16.4441C10.8714 16.4063 10.7887 16.3508 10.719 16.281L8.469 14.031C8.39927 13.9613 8.34395 13.8785 8.30621 13.7874C8.26848 13.6963 8.24905 13.5986 8.24905 13.5C8.24905 13.4014 8.26848 13.3037 8.30621 13.2126C8.34395 13.1215 8.39927 13.0387 8.469 12.969C8.60983 12.8282 8.80084 12.7491 9 12.7491C9.09862 12.7491 9.19627 12.7685 9.28738 12.8062C9.37848 12.844 9.46127 12.8993 9.531 12.969L11.25 14.6895L15.219 10.719C15.2887 10.6492 15.3714 10.5937 15.4626 10.5559C15.5537 10.5181 15.6514 10.4987 15.75 10.4987C15.8487 10.4987 15.9463 10.5181 16.0375 10.5559C16.1286 10.5937 16.2113 10.6492 16.281 10.719Z" fill="black"/>
  </svg>
`;
