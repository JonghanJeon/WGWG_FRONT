import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
import styles from './ChallengeChooseBox.module.css';
import CoffeeChallengeInsertBox from './CoffeeChallengeInsertBox';
import NChallengeInsertBox from './NChallengeInsertBox';

export default function ChallengeChooseInsertBox() {
  const [selectedChallenge, setSelectedChallenge] = React.useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // URL에서 현재 경로를 가져옵니다.
    const currentPath = location.pathname;

    // URL에 따라 선택된 챌린지를 설정합니다.
    if (currentPath === '/challenges/insert/coffee') {
      setSelectedChallenge('coffee');
    } else if (currentPath === '/challenges/insert/n') {
      setSelectedChallenge('n');
    }
  }, [location.pathname]);

  const handleChallengeClick = (challenge) => {
    if (selectedChallenge !== challenge) {
      setSelectedChallenge(challenge);
      navigate(`/challenges/insert/${challenge}`);
    }
  };

  return (
    <div className={styles.appContainer}>
      <div className={styles.chooseBoxContainer}>
        <h3 className={styles.title}>챌린지 만들기</h3>
        <p
          className={`${styles.subtitle} ${selectedChallenge === 'coffee' ? styles.active : ''}`}
          onClick={() => handleChallengeClick('coffee')}
        >
          커피 챌린지
        </p>
        <p
          className={`${styles.subtitle} ${selectedChallenge === 'n' ? styles.active : ''}`}
          onClick={() => handleChallengeClick('n')}
        >
          N원 챌린지
        </p>
      </div>
      {selectedChallenge === 'coffee' && <CoffeeChallengeInsertBox />}
      {selectedChallenge === 'n' && <NChallengeInsertBox />}
    </div>
  );

}
