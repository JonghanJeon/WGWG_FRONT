import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from 'styled-components';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 현재 경로 확인
  const isProfilePage = location.pathname === '/mypage';
  const isBankingPage = location.pathname === '/mypage/banking';
  const isChallengesPage = location.pathname === '/mypage/challenges';
  const isArticlesPage = location.pathname === '/mypage/articles';

  return (
    <>
      <StyledNavigator>
        <MyPageTitle>마이페이지</MyPageTitle>
        <StyledNavButton onClick={() => navigate('/mypage')} className={isProfilePage ? 'active' : ''} >
          프로필
        </StyledNavButton>
        <StyledNavButton onClick={() => navigate('/mypage/banking')} className={isBankingPage ? 'active' : ''} >
          가계부
        </StyledNavButton>
        <StyledNavButton onClick={() => navigate('/mypage/challenges')} className={isChallengesPage ? 'active' : ''} >
          챌린지
        </StyledNavButton>
        <StyledNavButton onClick={() => navigate('/mypage/articles')} className={isArticlesPage ? 'active' : ''} >
          게시글
        </StyledNavButton>
      </StyledNavigator>
    </>
  );
}

export default Sidebar;

const MyPageTitle = styled.p`
  color: #AFB7C5;
  text-align: center;
  font-family: Ubuntu;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 16px; 
`;

const StyledNavigator = styled.div`
  position: absolute;
  left: 49px;
  height: 19rem;
  width: 14rem;
  padding: 0.5rem;
  margin: 1.5rem;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-radius: 20px;
  border: 1px solid #D7D7D7;
  background: #FFF;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const StyledNavButton = styled.button`
    padding: 1rem;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    border: none; 
    outline: none;

    color: #000;
    text-align: center;
    font-family: Ubuntu;
    font-size: 32px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;

    &.active {
      color: #0064FF; 
      font-weight: bold;      
    }
`;
