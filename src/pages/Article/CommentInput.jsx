import React, { useState } from 'react';
import styled from 'styled-components';

const CommentInput = ({ onCommentSubmit }) => {
  const [commentText, setCommentText] = useState('');

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleSubmit = () => {
    if (commentText.trim() !== '') {
      onCommentSubmit(commentText);
      setCommentText('');
    }
  };

  return (
    <CommentInputContainer>
      <Textarea
        rows="4"
        placeholder="댓글을 입력하세요..."
        value={commentText}
        onChange={handleCommentChange}
      />
      <SubmitButton onClick={handleSubmit}>댓글 작성</SubmitButton>
    </CommentInputContainer>
  );
};

const CommentInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const Textarea = styled.textarea`
  resize: none;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  margin-bottom: 10px;
  width: 100%; /* 너비를 100%로 설정하여 넓힘 */
`;

const SubmitButton = styled.button`
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

export default CommentInput;
