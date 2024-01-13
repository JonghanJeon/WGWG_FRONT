import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom'; 
import styles from './ChallengeChooseBox.module.css';
import CoffeeChallengeUpdateBox from './CoffeeChallengeUpdateBox';
import NChallengeUpdateBox from './NChallengeUpdateBox';

export default function ChallengeChooseUpdateBox() {
  const [selectedChallenge, setSelectedChallenge] = React.useState(null);
  const location = useLocation();
  const {challengeId} = useParams(0);
  const {challengeType} = useParams("");

  // useEffect(() => {
  //   URL에서 현재 경로를 가져옵니다.
  //   const currentPath = location.pathname;

  //   // URL에 따라 선택된 챌린지를 설정합니다.
  //   if (currentPath === '/challenges/update/coffee') {
  //     setSelectedChallenge('coffee');
  //   } else if (currentPath === '/challenges/update/n') {
  //     setSelectedChallenge('n');
  //   }
  // }, [location.pathname]);

  return (
    <div className={styles.appContainer}>
      <div className={styles.chooseBoxContainer}>
        <h3 className={styles.title}>챌린지 만들기</h3>
        <p
          className={`${styles.subtitle} ${challengeType === 'COFFEE' ? styles.active : ''}`}
        >
          커피 챌린지
        </p>
        <p
          className={`${styles.subtitle} ${challengeType === 'N' ? styles.active : ''}`}
        >
          N원 챌린지
        </p>
      </div>
      {challengeType === "COFFEE" && <CoffeeChallengeUpdateBox />}
      {challengeType === 'N' && <NChallengeUpdateBox />}
    </div>
  );
}

