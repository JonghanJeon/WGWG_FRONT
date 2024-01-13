import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import CommentInput from "./CommentInput";
import EditCommentPage from "./EditCommentPage";
import EditArticleForm from "./EditArticleForm";

function ArticleDetail() {
  const [articleDetails, setArticleDetails] = useState({});
  const [comments, setComments] = useState([]);
  const params = useParams();
  const history = useNavigate();
  const [userSeq] = useState(sessionStorage.getItem("userSeq"));
  const [nickName] = useState(sessionStorage.getItem("nickName"));
  const [isEditOpen, setIsEditOpen] = useState(false);

  const fetchArticleDetails = () => {
    const articleReadUrl = `http://localhost:9000/articles/read/${params.articleId}`;
    const commentsUrl = `http://localhost:9000/comments/read/${params.articleId}`;

    axios
      .get(articleReadUrl)
      .then((response) => {
        console.log(response.data.data);
        setArticleDetails(response.data.data);
      })
      .catch((error) => {
        console.error("게시글 API 호출 오류:", error);
      });

    axios
      .get(commentsUrl)
      .then((response) => {
        setComments(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("댓글 API 호출 오류:", error);
      });
    window.scrollTo(0, 0);
  };

  const handleCommentSubmit = (commentText) => {
    const commentInsertUrl = "http://localhost:9000/comments/insert";

    axios
      .post(
        commentInsertUrl,
        {
          userSeq: userSeq,
          articleSeq: params.articleId,
          content: commentText,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setArticleDetails(response.data.data);
        fetchArticleDetails();
      })
      .catch((error) => {
        console.error("게시글 API 호출 오류:", error);
      });
  };

  const handleDelete = async (commentSeq) => {
    try {
      const response = await axios.delete(
        `http://localhost:9000/comments/delete/${commentSeq}`
      );
      console.log("댓글 삭제 성공:", response.data);
      // 게시글 삭제 후, 새로고침 없이 현재 페이지를 다시 불러옵니다.
      fetchArticleDetails();
    } catch (error) {
      console.error("댓글 삭제 오류:", error);
    }
  };

  useEffect(() => {
    fetchArticleDetails();
  }, []);

  const handleGoBack = () => {
    history("/articles");
  };

  // 팝업 창 열고 닫을 상태
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  // 선택된 댓글 정보
  const [selectedComment, setSelectedComment] = useState(null);

  // 팝업 창 열기
  const openPopup = (comment) => {
    setSelectedComment(comment);
    setIsPopupOpen(true);
  };

  // 팝업 창 닫기
  const closePopup = () => {
    setSelectedComment(null);
    setIsPopupOpen(false);
  };

  // 댓글 수정 성공 시 팝업 닫기
  const handleEditSuccess = () => {
    closePopup();
    fetchArticleDetails();
  };

  // 수정 버튼 클릭 시 수정 페이지 열기
  const handleEditClick = () => {
    setIsEditOpen(true);
  };

  // 수정 페이지에서 저장 클릭 시 호출되는 함수
  const handleEditSave = async (updatedArticle) => {
    try {
      // 서버로 수정된 내용을 전송
      const response = await axios.post(
        `http://localhost:9000/articles/update`,
        updatedArticle
      );
      console.log("게시글 수정 성공:", response.data);
      setIsEditOpen(false); // 수정 페이지 닫기
      fetchArticleDetails(); // 수정 후 게시글 다시 불러오기
    } catch (error) {
      console.log(updatedArticle);
      console.error("게시글 수정 오류:", error);
    }
  };

  // 수정 페이지에서 취소 클릭 시 호출되는 함수
  const handleEditCancel = () => {
    setIsEditOpen(false); // 수정 페이지 닫기
  };

  return (
    <Container>
      <Content>
        <Card>
          <Title>{articleDetails.title}</Title>
          <AuthorInfo>
            <Author>작성자: {articleDetails.writer}</Author>
            <PostTime>작성일: {articleDetails.updateDate}</PostTime>
          </AuthorInfo>
          <Divider />
          <Body>{articleDetails.content}</Body>
          {articleDetails.writer === nickName && (
            <EditButton onClick={handleEditClick}>게시글 수정</EditButton>
          )}
        </Card>
        <CommentSection>
          <CommentHeader>댓글</CommentHeader>
          {comments.map((comment) => (
            <Comment key={comment.commentSeq}>
              <CommentAuthor>{comment.nickName}</CommentAuthor>
              <CommentText>{comment.content}</CommentText>
              {comment.date[0]}.{comment.date[1]}.{comment.date[2]}
              {comment.writerSeq == userSeq && (
                <DeleteButton onClick={() => handleDelete(comment.commentSeq)}>
                  삭제
                </DeleteButton>
              )}
              {comment.writerSeq == userSeq && (
                <OpenPopupButton onClick={() => openPopup(comment)}>
                  수정
                </OpenPopupButton>
              )}
            </Comment>
          ))}
          <CommentInput onCommentSubmit={handleCommentSubmit} />
        </CommentSection>
      </Content>
      <ButtonContainer>
        <GoBackButton onClick={handleGoBack}>
          게시글 목록으로 돌아가기
        </GoBackButton>
      </ButtonContainer>
      {isEditOpen && (
        <EditPopup>
          <EditArticleForm
            initialData={articleDetails} // 현재 게시글 데이터를 폼에 전달
            onSave={handleEditSave} // 저장 클릭 시 호출되는 함수
            onCancel={handleEditCancel} // 취소 클릭 시 호출되는 함수
          />
        </EditPopup>
      )}
      {/* 팝업 컴포넌트 */}
      {isPopupOpen && (
        <PopupOverlay>
          <Popup>
            {/* 댓글 수정 페이지 */}
            <EditCommentPage
              comment={selectedComment}
              onEditSuccess={handleEditSuccess}
              onCancel={closePopup}
            />
          </Popup>
        </PopupOverlay>
      )}
    </Container>
  );
}

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

const Container = styled.div`
  background-color: #f7f7f7;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  max-width: 800px;
  width: 100%;
  padding: 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 900px; /* 변경된 부분: 원하는 최대 너비로 조정 */
  width: 100%;
  margin: 0 auto; /* 가운데 정렬을 유지 */
`;

const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 20px;
  color: #333;
`;

const AuthorInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Author = styled.p`
  font-size: 18px;
  color: #777;
`;

const PostTime = styled.p`
  font-size: 18px;
  color: #777;
`;

const Divider = styled.div`
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
`;

const Body = styled.div`
  font-size: 20px;
  line-height: 1.6;
  color: #333;
`;

const CommentSection = styled.div`
  width: 100%;
`;

const CommentHeader = styled.h2`
  font-size: 24px;
  margin-top: 20px;
  margin-bottom: 20px;
  color: #333;
`;

const Comment = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
`;

const CommentAuthor = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
`;

const CommentText = styled.p`
  font-size: 18px;
  color: #555;
`;

const ButtonContainer = styled.div`
  margin-bottom: 20px; /* 버튼 위 여백 추가 */
`;

const GoBackButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #0056b3;
  }
`;

const OpenPopupButton = styled.button`
  background-color: transparent;
  border: none;
  color: blue;
  cursor: pointer;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: darkred; /* 마우스 호버 시 더 어두운 빨간색으로 변경 */
  }
`;
const PopupOverlay = styled.div`
  /* 팝업 오버레이 스타일 */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* 팝업 이외의 영역을 어둡게 처리 */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Popup = styled.div`
  /* 팝업 컨테이너 스타일 */
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  width: 300px; /* 팝업 너비 조정 */
  position: relative;
`;

const EditButton = styled.button`
  /* 수정 버튼 스타일 */
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  margin-top: 30px;

  &:hover {
    background-color: #0056b3;
  }
`;

const EditPopup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export default ArticleDetail;
