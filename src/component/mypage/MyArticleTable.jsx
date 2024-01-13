import React, { useEffect, useState } from "react";
import { client } from "../../libs/api";
import styled from "styled-components";
import { Link } from 'react-router-dom';

const userSeq = sessionStorage.getItem("userSeq");

const MyArticleTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [articles, setArticles] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const handlePageChange = async (page) => {
    setCurrentPage(page);
  };

  const Article = ({articleData}) => {
    return (
        <tr>
            <StyledTD> {articleData.insertDate[0]}.{articleData.insertDate[1]}.{articleData.insertDate[2]}. {articleData.insertDate[3]}:{articleData.insertDate[4]}:{articleData.insertDate[5]}</StyledTD>
            <StyledTD>{articleData.title}</StyledTD>
            <StyledTD>{articleData.category}</StyledTD>
            <StyledTD>
                <ButtonContainer>
                  <UpdateButton as={Link} to={`/articles/update/${articleData.articleSeq}`}>
                    수정
                  </UpdateButton> 
                  <DeleteButton onClick={() => handleDelete(articleData.articleSeq)}>
                    삭제
                  </DeleteButton>
                </ButtonContainer>
            </StyledTD>
        </tr>
    );
  }
  
  const fetchArticles = async () => {
    try {
      const response = await client.get(`/articles/read/my/${userSeq}?page=${currentPage}`);
      const articleData = response.data.data.content || [];
      const total = response.data.data.totalPages || 1;
      setArticles(articleData);
      setTotalPages(total);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  const handleDelete = async (articleId) => {
    const confirmDelete = window.confirm("게시글을 삭제하시겠습니까?");
    if (confirmDelete) {
      await deleteArticle(articleId);
    }
  };
  
  const deleteArticle = async (articleId) => {
    try {
      const response = await client.delete(`/articles/delete/${articleId}`);
      if (response.status === 200 && response.data.success) {
        alert("게시글 삭제 완료");
        fetchArticles(); // 게시글 목록 다시 불러오기
      } else {
        alert("게시글 삭제 실패");
      }
    } catch (error) {
      alert("서버 오류");
    }
  };  

  // 페이지가 변경될 때마다 데이터를 다시 불러오도록 useEffect 사용
  useEffect(() => {
    fetchArticles();
  }, [currentPage]);
  
  return (
    <>
      <MyArticleArea>
        <MainName>게시글</MainName>
        <DivideLine />

        <StyledTable>
          <thead>
            <tr>
              <StyledTH>작성일시</StyledTH>
              <StyledTH>글제목</StyledTH>
              <StyledTH>카테고리</StyledTH>
              <StyledTH></StyledTH>
            </tr>
          </thead>
          <tbody>
            {articles.map((article, index) => ( 
              <Article key={index} articleData={article} />
            ))}
          </tbody>
        </StyledTable>

        <Pagination>
          {Array.from({ length: totalPages }, (_, index) => (
            <PageNumber
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              active={currentPage === index + 1}
            >
              {index + 1}
            </PageNumber>
          ))}
        </Pagination>
      </MyArticleArea>
    </>
  );
};

export default MyArticleTable;

const MyArticleArea = styled.div`
  border-radius: 1.25rem;
  background-color: white;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
  padding: 0.5rem;
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

const MainName= styled.div`
  color: #595B5D;
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

const StyledTable = styled.table`
  margin: 2rem;
  padding: 1rem;
  border: 1px solid #B9B9B9;
  border-radius: 0.5rem;
  border-collapse: collapse;
  width: 90%;
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
const ButtonContainer = styled.div`
  display: flex; 
  gap: 0.5rem; 
  justify-content: center;
`;

const UpdateButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(31, 119, 255, 0.9);
  color: white;
  text-decoration-line: none;
  border-radius: 0.25rem;
  border: none;
  font-size: 12px;
  height: 1.5rem;
  width: 2.5rem;
`;

const DeleteButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 156, 156, 0.9);
  color: white;
  border-radius: 0.25rem;
  border: none;
  font-size: 12px;
  height: 1.5rem;
  width: 2.5rem;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const PageNumber = styled.div`
  cursor: pointer;
  padding: 0.5rem;
  margin: 0.2rem;
  background-color: ${({ active }) => (active ? "#007bff" : "#fff")};
  color: ${({ active }) => (active ? "#fff" : "#007bff")};
  border: 1px solid #007bff;
  border-radius: 0.25rem;

  &:hover {
    background-color: #007bff;
    color: #fff;
  }
`;