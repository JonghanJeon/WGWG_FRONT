// export default ChallengeDetail;
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import participantIcon from '../../assets/img/participant-icon.png';
import survivorIcon from '../../assets/img/survivor-icon.png';
import failureIcon from '../../assets/img/failure-icon.png';
import rewardIcon from '../../assets/img/reward-icon.png'
import blueIcon from '../../assets/img/blue-participant.png';
import grayIcon from '../../assets/img/gray-participant.png';
import outIcon from '../../assets/img/out-participant.png';
import Pagination from 'react-js-pagination';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ITEMS_PER_PAGE = 15;

const Container = styled.div`
    width: 100%;
    max-width: 800px;
    margin: 5rem auto;
`

const ChallengeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  padding: 10px;
  /* border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); */
`;

const ChallengeInfoWrapper = styled.div`
    margin-top: 50px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 20px;
    box-shadow: 0px 4px 4px 2px rgba(0, 0, 0, 0.1);
`

const ChallengeInfo = styled.div`
    display: flex;
    justify-content: space-between;
`

const ChallengeInfoMenu = styled.div`
    font-weight: bold;
`

const ParticipantTitle = styled.h1`
    color: #5D5D5D;
    font-weight: bold;
`

const ChallengeTitle = styled.div`
  font-size: 32px;
  font-weight: bold;
`;

const ChallengeButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const ParticipantInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  padding: 10px;
  /* border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); */
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px;
`;

const RewardInfo = styled.div`
    color: #BDBDBD;
    font-weight: bold;
`;

const Text = styled.div`
  color: #BDBDBD;
  display: flex; /* 이미지와 텍스트를 같은 줄에 배치 */
  align-items: center; /* 수직 가운데 정렬 */
`;

const ParticipantListUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
`;

const ParticipantItem = styled.li`
  width: 20%;
  text-align: center;
`;

const ParticipantImage = styled.img`
  width: 100%;
  max-width: 80px;
  height: auto;
`;

const ParticipantName = styled.div`
  margin-top: 5px; /* 아이콘 아래에 간격 추가 */
`;

const PaginationBox = styled.div`
  .pagination {
    justify-content: center;
    margin-top: 15px;
  }
`;

const ChallengeDetail = () => {
    const navigate = useNavigate();
    const [showParticipateButton, setShowParticipateButton] = useState(false);
    const [showConsumeButton, setShowConsumeButton] = useState(false);
    const [showSavingButton, setShowSavingButton] = useState(false);
    const [showDeleteUpdateButton, setShowDeleteUpdateButton] = useState(false);
    const [page, setPage] = useState(1);
    const [totalElements, setTotalElements] = useState(0);
    const [participantChunk, setParticipantChunk] = useState([]);
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState([]);
    const [endDate, setEndDate] = useState([]);
    const [amount, setAmount] = useState(0);
    const [challengeTitle, setChallengeTitle] = useState("");
    const [challengeReward, setChallengeReward] = useState(0);
    const [allParticipantCnt, setAllParticipantCnt] = useState(0);
    const [survivorCnt, setSurvivorCnt] = useState(0);
    const [failureCnt, setFailureCnt] = useState(0);
    const [status, setStatus] = useState("");
    const {challengeId} = useParams(0);
    const {challengeType} = useParams("");

    useEffect(() => {
        const url = "http://localhost:9000/challengeuser/checkuser";
        axios.post(url, {
            challengeId : challengeId,
            userSeq : sessionStorage.getItem("userSeq") //localStorage.getItem("userSeq")
        }).then(res => {
            // 챌린지 정보 받아오기
            if(challengeType == "N"){
                axios.get(`http://localhost:9000/challenges/read/n/${challengeId}`).then(res => {
                    console.log("status = "+ res.data.data.status);
                    setStatus((current)=>res.data.data.status);
                    setDescription((current) => res.data.data.description);
                    setStartDate((current) => res.data.data.startDate);
                    setEndDate((current) => res.data.data.endDate);
                    setChallengeTitle((current) => res.data.data.title);
                    setChallengeReward((current) => res.data.data.reward);
                    setAmount((current) => res.data.data.deposit);
                }).catch(err => {
                    console.error("API 호출 오류 : "+ err);
                })
            }else{
                axios.get(`http://localhost:9000/challenges/read/coffee/${challengeId}`).then(res => {
                    console.log("status = "+ res.data.data.status);
                    setStatus((current)=>res.data.data.status);
                    setDescription((current) => res.data.data.description);
                    setStartDate((current) => res.data.data.startDate);
                    setEndDate((current) => res.data.data.endDate);
                    setChallengeTitle((current) => res.data.data.title);
                    setChallengeReward((current) => res.data.data.reward);
                    setAmount((current) => res.data.data.savingAmount);
                }).catch(err => {
                    console.error("API 호출 오류 : "+ err);
                })
            }
            // 챌린지 참여자 수 받아오기
            axios.post("http://localhost:9000/challengeuser/cnt", {
                challengeId : challengeId
            }).then(res => {
                setAllParticipantCnt((current) => res.data.data.allParticipantCnt);
                setSurvivorCnt((current) => res.data.data.survivorCnt);
                setFailureCnt((current) => res.data.data.failureCnt);
            }).catch(err => {
                console.error("API 호출 오류 : "+ err);
            })
            // 버튼 활성화 비활성화
            console.log(res.data.data.participantType);
            if(res.data.data.participantType === "개설자" || res.data.data.participantType === "참여자"){ // 개설자or참여자일 경우
                // 개설자 참여자 모두
                if(challengeType == "N"){ // N 챌린지일 경우
                    setShowConsumeButton((current) => true); // 소비버튼 활성화
                    setShowSavingButton((current) => false); // 절약버튼 비활성화
                    setShowParticipateButton((current) => false); // 참여 버튼 비활성화
                    setShowDeleteUpdateButton((current) => false); // 수정 삭제 버튼 비활성화
                }else{ // Coffee 챌린지일 경우
                    setShowConsumeButton((current) => false); // 소비버튼 비활성화
                    setShowSavingButton((current) => true); // 절약버튼 활성화
                    setShowParticipateButton((current) => false); // 참여 버튼 비활성화
                    setShowDeleteUpdateButton((current) => false); // 수정 삭제 버튼 비활성화
                }
                if(res.data.data.participantType === "개설자"){ // 개설자일 경우
                    setShowDeleteUpdateButton((current) => true); // 수정 삭제 버튼 활성화
                }
            }else{ // 비참여자일 경우
                setShowParticipateButton((current) => true); // 참여 버튼 활성화
                setShowConsumeButton((current) => false); // 소비버튼 비활성화
                setShowSavingButton((current) => false); // 절약버튼 비활성화
                setShowDeleteUpdateButton((current) => false); // 수정 삭제 버튼 비활성화
            }
        }).catch(err => {
            console.error("API 호출 오류 : "+ err);
        })
        fetchUser(1);
    }, [])

    useEffect(() => {
        fetchUser(1);
    }, [])

    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
        fetchUser(pageNumber);
    };

    const fetchUser = (pageNumber) => {
        const url = "http://localhost:9000/challengeuser/read";
        axios.post(url, {
            challengeId : challengeId
        }).then(res => {
            setTotalElements(res.data.data.totalElements);
            const participantChunks = [];
            for (let i = 0; i < res.data.data.content.length; i += 5) {
                participantChunks.push(res.data.data.content.slice(i, i + 5));
            }
            setParticipantChunk(participantChunks);
        }).catch(err => {
            console.error("API 호출 오류 : "+ err);
        })
    }

    const deleteHandler = () => {
        if(challengeType == "N"){
            axios.delete(`http://localhost:9000/challenges/delete/n/${challengeId}`)
            .then(res => {
                console.log(res.data.data);
                if(res.data.success){
                    alert("성공적으로 삭제되었습니다!");
                    navigate("/challenges/list");
                }else{
                    alert("삭제 실패하였습니다.")
                }
            }).catch(err => {
                console.log("API 호출 오류 : "+ err);
            })
        }else{
            axios.delete(`http://localhost:9000/challenges/delete/coffee/${challengeId}`)
            .then(res => {
                console.log(res.data.data);
                if(res.data.success){
                    alert("성공적으로 삭제되었습니다!");
                    navigate("/challenges/list");
                }else{
                    alert("삭제 실패하였습니다.")
                }
            }).catch(err => {
                console.log("API 호출 오류 : "+ err);
            })
        }
        
    }

     // endDate[2]가 1이면 endDate[1]의 마지막 일로 표시하고, 아니면 endDate[2]에서 1을 뺀 날짜로 설정
     const formattedEndDate = () => {
        let year = endDate[0];
        let month = endDate[1];
        let day = endDate[2];
        if (day === 1) {
            if (month === 1) {
                // 1월인 경우 12월 31일로 설정
                year -= 1;
                month = 12;
                day = 31;
            } else {
                // 이 외의 월은 해당 월의 마지막 날짜로 설정
                day = new Date(year, month-1, 0).getDate();
                month -= 1;
            }
        } else {
            // day가 1이 아닌 경우 day에서 1을 뺌
            day -= 1;
        }
        return `${year}년${month}월${day}일`;
    };  

    

    return (
        <>
            <Container>
            <ChallengeHeader>
                <ChallengeTitle>&#127939;{challengeTitle}</ChallengeTitle>
                <ChallengeButtons>
                    {status === "모집중" && showDeleteUpdateButton && <Button variant="primary" size="sm" onClick={() => navigate(`/challenges/update/${challengeId}/${challengeType}`)}>+ 수정 </Button>}
                    {status === "모집중" && showDeleteUpdateButton && <Button variant="primary" size="sm" onClick={deleteHandler}>+ 삭제 </Button>}
                    {status === "모집중" && showParticipateButton && <Button variant="primary" size="sm" onClick={() => navigate(`/challenges/participate/${challengeId}/${challengeType}`)}>+ 챌린지 참여</Button>}
                    {status === "진행중" && showConsumeButton && <Button variant="primary" size="sm">+ 소비 등록하기</Button>}
                    {status === "진행중" && showSavingButton && <Button variant="primary" size="sm" onClick={() => navigate(`/challenges/payment/${challengeId}`)}>+ 절약액 입금하기 </Button>}
                </ChallengeButtons>
            </ChallengeHeader>
            <hr />
            <ParticipantInfo>
                <div>
                    <Text>
                        <Icon src={participantIcon} alt="참여자 아이콘" />
                        {allParticipantCnt}명 참여중
                    </Text>
                </div>
                <div>
                    <Text>
                        <Icon src={survivorIcon} alt="생존자 아이콘" />
                        {survivorCnt}명 생존
                    </Text>
                </div>
                <div>
                    <Text>
                        <Icon src={failureIcon} alt="실패자 아이콘" />
                        {failureCnt}명 실패
                    </Text>
                </div>
                <div>
                    <Text>
                        <Icon src={rewardIcon} alt="예상 리워드 아이콘" />
                        예상 리워드 : {challengeReward}원
                    </Text>
                </div>
            </ParticipantInfo>
            <hr />
            <ChallengeInfoWrapper>
                <ChallengeInfo>
                    {description}
                </ChallengeInfo>
                <br />
                <ChallengeInfo>
                    <ChallengeInfoMenu>
                        &#128181;{challengeType == "N" ? "보증금" : "적금액"}
                    </ChallengeInfoMenu>
                    {amount}원
                </ChallengeInfo>
                <ChallengeInfo>
                    <ChallengeInfoMenu>&#128197;챌린지 시작일</ChallengeInfoMenu>
                    {startDate[0]}년{startDate[1]}월{startDate[2]}일
                </ChallengeInfo>
                <ChallengeInfo>
                    <ChallengeInfoMenu>&#128197;챌린지 종료일</ChallengeInfoMenu>
                    {formattedEndDate()}
                </ChallengeInfo>
            </ChallengeInfoWrapper>
            <ChallengeInfoWrapper>
                <ParticipantTitle>&#128108;참여자 현황</ParticipantTitle>
                <hr />
                {participantChunk.map((chunk, index) => (
                    <ParticipantListUl key={index}>
                        {chunk.map((participant) => {
                            let iconSrc = '';
                            if (participant.isSuccess == 2) {
                                iconSrc = blueIcon;
                            } else if(participant.isSuccess == 1){
                                iconSrc = grayIcon;
                            } else {
                                iconSrc = outIcon;
                            }
                            return (
                                <ParticipantItem key={participant.nickName}>
                                    <ParticipantImage src={iconSrc} alt={`참여자 ${participant.nickName} 아이콘`} />
                                    <ParticipantName>{participant.nickName}</ParticipantName>
                                </ParticipantItem>
                            );
                        })}
                    </ParticipantListUl>
                ))}
                <PaginationBox>
                <Pagination
                    activePage={page}
                    itemsCountPerPage={ITEMS_PER_PAGE}
                    totalItemsCount={totalElements}
                    pageRangeDisplayed={5}
                    onChange={handlePageChange}
                    itemClass="page-item"
                    linkClass="page-link"
                />
                </PaginationBox>
            </ChallengeInfoWrapper>
            </Container>
        </>
    );
}

export default ChallengeDetail;
