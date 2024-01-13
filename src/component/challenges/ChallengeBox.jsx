import React from 'react';
import { Button } from 'react-bootstrap';
import styled from "styled-components"
import { useNavigate } from 'react-router-dom';

export default function ChallengeBox({ title, isStatus, deposit, startDate, endDate, challengeType, challengeId }) {
    const navigate = useNavigate();
    let statusText;
    let statusColor;

    switch (isStatus) {
        case '모집중':
            statusText = `모집중`;
            statusColor = '#FFA807'; // 원하는 색상 지정
            break;
        case '진행중':
            statusText = '진행중';
            statusColor = 'blue'; // 원하는 색상 지정
            break;
        case '종료':
            statusText = '종료';
            statusColor = 'gray'; // 원하는 색상 지정
            break;
        default:
            statusText = '상태없음';
            statusColor = 'black';
    }

    return (
        <ChallengeBox1>
            <ChallengeTitle>{title}</ChallengeTitle>
            <div className='info-right'>
                <span style={{ color: statusColor }}></span>
                {isStatus === '모집중' && (
                    <span style={{ color: '#FFA807' }}>&#128310;{statusText}</span>
                )}
                {isStatus === '진행중' && (
                    <span style={{ color: 'blue' }}>&#128293;{statusText}</span>
                )}
                {isStatus === '종료' && (
                    <span style={{ color: 'gray' }}>{statusText}</span>
                )}
            </div>
            <br />
            <div className="info">
                <div className='info-title'>{challengeType == "N" ? "보증금" : "적금액"}</div>
                {deposit}원
            </div>
            <div className='info'>
                <div className='info-title'>시작일</div>
                {startDate}
            </div>
            <div className='info'>
                <div className='info-title'>종료일</div>
                {endDate}
            </div>
            <br /><br />
            <div className='info-center'>
                <div>
                    <Button onClick={() => navigate(`/challenges/detail/${challengeId}/${challengeType}`)}>챌린지 보기</Button>
                </div>
            </div>
        </ChallengeBox1>
    )
}

const ChallengeBox1 = styled.div`
    width: 300px;
    text-align: center;
    padding: 1rem;
    background-color: #f6f6f6;
    border-radius: 20px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    margin-bottom: 1rem;
    transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out;

    .info-right {
        width: 100%;
        text-align: right;
    }

    .info{
        display: flex;
        justify-content: space-between;
    }

    .info-center{
        width:100%;
        text-align: center;
    }

    .info-title {
        font-weight: bold;
    }

    h4 {
        font-size: 14px;
        margin: 0;
    }

    span {
        font-size: 15px;
    }

    &:hover {
        background-color: #ffffff; /* 마우스 호버 시 연한 파란색 배경으로 변경 */
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
        transform: scale(1.02); /* 약간 확대되는 애니메이션 효과 */
    }
`;

const ChallengeTitle = styled.h5`
    font-size: 22px;
    font-weight: bold;
`