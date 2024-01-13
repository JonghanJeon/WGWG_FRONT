import React from "react";
import styled from "styled-components";
import Sidebar from "../../component/mypage/Sidebar";
import MyOngoingChallengeTable from "../../component/mypage/MyOngoingChallengeTable";
import MyFinishedChallengeTable from "../../component/mypage/MyFinishedChallengeTable";

const MyChallenges = () => {
  return (
    <>
      <Sidebar />

      <MyChallengeArea>
        <MainName>챌린지</MainName>
        <DivideLine />

        <GraphicArea>
          {/* <div dangerouslySetInnerHTML={{ __html: IconCoin }}/> 누적 리워드 */}
          // 여기에 사진 배경으로 한 div 만들고, 순리워드 계산 값 가운데에
          출력하기
          <div>트로피 아이콘 자리</div> 챌린지 성공률
        </GraphicArea>

        <TableArea>
          <ChallengeTablesWrapper>
            <MyOngoingChallengeTable />
          </ChallengeTablesWrapper>
          <ChallengeTablesWrapper>
            <MyFinishedChallengeTable />
          </ChallengeTablesWrapper>
        </TableArea>
      </MyChallengeArea>
    </>
  );
};

export default MyChallenges;

const MainName = styled.div`
  color: #595b5d;
  text-align: center;
  font-family: Ubuntu;
  font-size: 48px;
  font-style: normal;
  font-weight: 700;
  line-height: 16px;
  margin: 5rem;
`;

const DivideLine = styled.hr`
  border: none;
  border-top: 1px solid #000;
  width: 95%;
  margin-bottom: 2rem;
`;

const MyChallengeArea = styled.div`
  border-radius: 1.25rem;
  background-color: white;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
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

const GraphicArea = styled.div``;

const TableArea = styled.div`
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const ChallengeTablesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
