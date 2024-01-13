import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import styled from "styled-components";
import Pagination from "react-js-pagination";
import { Link } from "react-router-dom";

const ITEMS_PER_PAGE = 10;

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [nickName] = useState(sessionStorage.getItem("nickName"));
  const [selectedCategory, setSelectedCategory] = useState("전체보기"); // 기본 카테고리 선택

  const handlePageChange = (pageNumber) => {
    console.log(pageNumber);
    setPage(pageNumber);
    fetchArticles(pageNumber);
  };

  useEffect(() => {
    fetchArticles(1);
  }, []);

  useEffect(() => {
    fetchArticles(1); // 카테고리가 변경되면 첫 페이지에서 게시글을 다시 불러옵니다.
  }, [selectedCategory]);

  useEffect(() => {
    // 페이지가 변경될 때 페이지 상단으로 이동
    window.scrollTo(0, 0);
  }, [page]);

  const fetchArticles = (pageNumber) => {
    const url = "http://localhost:9000/articles/read?page=" + pageNumber;
    console.log(url);
    console.log(pageNumber);
    console.log(selectedCategory);
    axios
      .post(url, {
        category: selectedCategory,
        page: pageNumber,
        size: ITEMS_PER_PAGE,
      })
      .then((response) => {
        console.log(response.data.data);
        setArticles(response.data.data.content);
        setTotalElements(response.data.data.totalElements);
      })
      .catch((error) => {
        console.error("API 호출 오류:", error);
      });
  };

  const handleDelete = async (articleId) => {
    try {
      const response = await axios.delete(
        `http://localhost:9000/articles/delete/${articleId}`
      );
      console.log("게시글 삭제 성공:", response.data);
      // 게시글 삭제 후, 새로고침 없이 현재 페이지를 다시 불러옵니다.
      fetchArticles(page);
    } catch (error) {
      console.error("게시글 삭제 오류:", error);
    }
  };

  const handleCategoryChange = (e) => {
    setPage(1);
    setSelectedCategory(e.target.value);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 text-center">
          <h1
            className="display-8 font-weight-bold mb-2"
            style={{ fontSize: "48px", color: "#595B5D" }}
          >
            {selectedCategory} 게시판
          </h1>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <Link to="/articles/insert" className="btn btn-primary ml-auto">
              게시글 작성
            </Link>
          </div>
        </div>
      </div>
      <hr className="my-1" />
      <div className="row mt-3">
        <div className="col-md-6 offset-md-3">
          <CategorySelect
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="전체보기">전체보기</option>
            <option value="알려줄래">알려줄래</option>
            <option value="같이살래">같이살래</option>
            <option value="살까말까">살까말까</option>
            <option value="속닥속닥">속닥속닥</option>
          </CategorySelect>
          {articles.map((article, index) => (
            <ArticleItem key={index}>
              <Link
                to={`/articles/${article.articleSeq}`}
                style={{ textDecoration: "none" }}
              >
                <UserInfo>
                  <UserAvatar src="\logo192.png" alt="User Avatar" />
                  <UserInfoText>
                    <UserName>{article.writer}</UserName>
                    <PostTime>
                      작성일: {article.updateDate[0]}.{article.updateDate[1]}.
                      {article.updateDate[2]}
                    </PostTime>
                  </UserInfoText>
                </UserInfo>
                <PostContent>
                  <h3>{article.title}</h3>
                  <p>{article.body}</p>
                </PostContent>
                <PostActions>
                  <CommentButton>
                    <img src="../speech-bubble.png"></img>({article.commentSize}
                    )
                  </CommentButton>
                  {nickName === article.writer && (
                    <DeleteButton
                      onClick={() => handleDelete(article.articleSeq)}
                    >
                      삭제
                    </DeleteButton>
                  )}
                </PostActions>
              </Link>
            </ArticleItem>
          ))}
          <div className="row mt-3"></div>
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
        </div>
      </div>
    </div>
  );
}

const PaginationBox = styled.div`
  .pagination {
    justify-content: center;
    margin-top: 15px;
  }
`;

const ArticleItem = styled.div`
  background-color: #fff; /* 흰 배경 색상 */
  border: 1px solid #e5e5e5; /* 연한 회색 테두리 */
  border-radius: 10px; /* 더 둥근 모서리 */
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out;

  &:hover {
    background-color: #f2f9ff; /* 마우스 호버 시 연한 파란색 배경으로 변경 */
    transform: scale(1.02); /* 약간 확대되는 애니메이션 효과 */
  }

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

const CategorySelect = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f5f5f5; /* 연한 회색 배경 색상 */
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* 이미지 주위에 약간의 그림자 효과 추가 */
`;

const PostContent = styled.div`
  h3 {
    font-size: 1.5rem;
    margin-top: 0;
    color: #007bff; /* 애플 블루 컬러 사용 */
  }

  p {
    color: #333;
  }
`;

const CommentButton = styled.button`
  background-color: transparent;
  border: none;
  color: #007bff; /* 애플 블루 컬러 사용 */
  cursor: pointer;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #0056b3; /* 마우스 호버 시 조금 더 어두운 블루 컬러로 변경 */
  }
`;

const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  color: red;
  cursor: pointer;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: darkred; /* 마우스 호버 시 더 어두운 빨간색으로 변경 */
  }
`;

const UserInfoText = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.span`
  font-weight: bold;
`;

const PostTime = styled.span`
  color: #555;
  font-size: 14px;
`;

const PostActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

export default ArticleList;
