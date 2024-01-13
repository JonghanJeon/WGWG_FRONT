import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const initialValues = {
  title: "",
  content: "",
  category: "알려줄래", // 기본 카테고리
};

function ArticleForm() {
  const history = useNavigate();
  const [formData, setFormData] = useState(initialValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGoBack = () => {
    history("/articles");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      userSeq: sessionStorage.getItem("userSeq"),
      title: formData.title,
      content: formData.content,
      category: formData.category,
    };

    try {
      const response = await axios.post(
        "http://localhost:9000/articles/insert",
        dataToSend,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("서버 응답:", response.data);
      handleGoBack();
      setFormData({
        title: "",
        content: "",
        category: "",
      });
    } catch (error) {
      console.log(sessionStorage.getItem("userSeq"));
      console.error("서버 API 호출 오류:", error);
    }
  };

  return (
    <FormContainer>
      <h2 style={{ textAlign: "center" }}>게시글 작성</h2>
      <form onSubmit={handleSubmit}>
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

        <FormGroup>
          <label htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            required
          />
        </FormGroup>

        <SubmitButton type="submit">게시글 작성</SubmitButton>
      </form>
    </FormContainer>
  );
}

const FormContainer = styled.div`
  max-width: 600px;
  margin: 100px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;

  h2 {
    margin-top: 0;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;

  label {
    display: block;
    font-weight: bold;
  }

  input,
  textarea,
  select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
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

export default ArticleForm;
