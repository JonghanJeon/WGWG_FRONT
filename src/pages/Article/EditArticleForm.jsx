import React, { useState } from 'react';
import styled from 'styled-components';

const EditArticleForm = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState(initialData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <FormContainer>
      <FormTitle>게시글 수정</FormTitle>
      <FormGroup>
          <label htmlFor="category">카테고리</label>
          <StyledSelect
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="알려줄래">알려줄래</option>
            <option value="같이살래">같이살래</option>
            <option value="살까말까">살까말까</option>
            <option value="속닥속닥">속닥속닥</option>
          </StyledSelect>
        </FormGroup>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="title">제목</Label>
          <Input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="content">내용</Label>
          <TextArea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            required
          />
        </FormGroup>
        <ButtonContainer>
          <SaveButton type="submit">저장</SaveButton>
          <CancelButton onClick={onCancel}>취소</CancelButton>
        </ButtonContainer>
      </Form>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  width: 40%;
  height: 70%;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 16px;
  color: #333;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  height: 130px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const SaveButton = styled.button`
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

const CancelButton = styled.button`
  background-color: transparent;
  border: none;
  color: #777;
  font-size: 16px;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    color: #333;
  }
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: white; /* 기본 배경색을 흰색으로 설정 */
  appearance: none; /* 브라우저 기본 스타일 제거 */

  &:focus {
    background-color: white; /* 드롭다운 팝업 배경색 설정 */
  }
`;

export default EditArticleForm;
