import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const EditCommentPage = ({ comment, onEditSuccess, onCancel }) => {
  const [editedComment, setEditedComment] = useState(comment.content);

  const handleCommentChange = (e) => {
    setEditedComment(e.target.value);
  };

  const handleSave = async () => {
    try {
      const response = await axios.post(
        `http://localhost:9000/comments/update`,
        {
          commentSeq: comment.commentSeq,
          content: editedComment,
        }
      );

      if (response.status === 200) {
        // 댓글 수정 성공 시 부모 컴포넌트로 성공 신호를 보냅니다.
        onEditSuccess();
      }
    } catch (error) {
      console.error('댓글 수정 오류:', error);
    }
  };

  return (
    <EditContainer>
      <EditHeader>댓글 수정</EditHeader>
      <EditTextarea
        rows="4"
        value={editedComment}
        onChange={handleCommentChange}
      />
      <ButtonContainer>
        <CancelButton onClick={onCancel}>취소</CancelButton>
        <SaveButton onClick={handleSave}>저장</SaveButton>
      </ButtonContainer>
    </EditContainer>
  );
};

const EditContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const EditHeader = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
`;

const EditTextarea = styled.textarea`
  resize: none;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  margin-bottom: 10px;
  width: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

const SaveButton = styled.button`
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
  margin-right: 10px;
`;

const CancelButton = styled.button`
  background-color: #6c757d;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
`;

export default EditCommentPage;
