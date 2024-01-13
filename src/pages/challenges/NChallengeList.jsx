import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import Pagination from 'react-js-pagination';
import ChallengeBox from '../../component/challenges/ChallengeBox';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ITEMS_PER_PAGE = 8;
const CHALLENGE_TYPE = "N";

function NChallengeList() {
  const navigate = useNavigate();
  
  /////////////////////////////////////////////////////////////////////

  const [challengeList, setChallengeList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [filter, setFilter] = useState("전체보기");

  useEffect(() => {
    fetchChallenges(1);
  }, []);

  useEffect(()=>{
    fetchChallenges(1);
  }, [filter])

  const handleFilterChange = (event) => {
    console.log("handleFilterChange ,,, event.target.value = " + event.target.value);
    setPage(1);
    setFilter(event.target.value);
  };

  const handlePageChange = (pageNumber) => {
    console.log("hanlePageChange ,,, pageNumber = "+pageNumber);
    setPage(pageNumber);
    console.log("pageNumber = " + pageNumber);
    console.log("page = "+page);
    fetchChallenges(pageNumber);
  };

  const fetchChallenges = (pageNumber) => {
    const url = "http://localhost:9000/challenges/read/n?page="+pageNumber;
    console.log(url);
    console.log(filter);
    axios.post(url, {
      status : filter,
      challengeType : CHALLENGE_TYPE
    }).then(res => {
      setChallengeList((current) => res.data.data.content);
      setTotalElements(res.data.data.totalElements);
      console.log("1111111111111111");
      console.log(res.data.data.content);
      console.log(challengeList);
    }).catch(err => {
      console.error("API 호출 오류: " + err);
    });
  };

  ////////////////////////////////////////////////////////////////////

  return (
    <Container>
      <Title>N원 챌린지</Title>
      <ButtonDiv><Button onClick={() => navigate("/challenges/insert/n")}>N챌린지 만들기</Button></ButtonDiv>
      <hr />
      <FilterSelector>
        <Select
          id="filterSelect"
          value={filter}
          onChange={handleFilterChange}
        >
          <option value="전체보기">전체보기</option>
          <option value="모집중">모집중</option>
          <option value="진행중">진행중</option>
          <option value="종료">종료</option>
        </Select>
      </FilterSelector>
      <Feed>
        {challengeList.map((challenge, index) => (
              <ChallengeBox
              title={challenge.title}
              isStatus={challenge.status}
              deposit={challenge.deposit}
              startDate={`${challenge.startDate[0]}-${challenge.startDate[1]}-${challenge.startDate[2]}`}
              endDate={`${challenge.endDate[0]}-${challenge.endDate[1]}-${challenge.endDate[2]}`}
              challengeType={"N"}
              challengeId={challenge.challengeId}/>
        ))}
      </Feed>
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
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  background-color: #fff; 
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);  
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: #595B5D;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
`;

const FilterSelector = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Label = styled.label`
  margin-right: 10px;
  font-weight: bold;
  font-size: 1rem;
  color: #333;
`;

const Select = styled.select`
  background-color: white;
  color: black;
  padding: 12px;
  width: 250px;
  border: none;
  font-size: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);  
  border-radius: 10px;
  -webkit-appearance: button;
  appearance: button;
  outline: none;
  &:focus{
    color: #0D6EFD;
  }
`;


const Feed = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  
  animation: fadeInUp 0.5s ease-in-out;

  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const PaginationBox = styled.div`
  .pagination {
    justify-content: center;
    margin-top: 15px;
  }
`;

const ButtonDiv = styled.div`
  width: 100%;
  max-width: 1300px;
  text-align: right;
`
export default NChallengeList;