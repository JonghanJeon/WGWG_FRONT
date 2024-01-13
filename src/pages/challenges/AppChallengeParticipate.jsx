import React from 'react';
import ChallengeChooseBox from '../../components/challenges/ChallengeChooseInsertBox';
import Navbar from '../../components/navbar/Navbar';
import styled from 'styled-components';
import NChallengeParticipateBox from '../../components/challenges/NChallengeParticipateBox';

export default function AppChallengeParticipate() {
    return (
        <>
            <Navbar/>
            <NChallengeParticipateBox
                challengeName="7만원으로 일주일살기"
                deposit="6000"/>
        </>
    );
}