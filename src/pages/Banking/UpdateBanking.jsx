import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import axios from "axios";

function RegisterBanking() {
  const [bankingType, setBankingType] = useState("");
  const [bankingDateTime, setBankingDateTime] = useState(new Date());
  const [bankingCategory, setBankingCategory] = useState("");
  const [bankingAmount, setBankingAmount] = useState("");
  const [bankingDescription, setBankingDescription] = useState("");

  const bankingTypeInputRef = useRef(null);
  const bankingCategoryInputRef = useRef(null);
  const bankingAmountInputRef = useRef(null);
  const bankingDescriptionInputRef = useRef(null);
  const navigate = useNavigate();

  const { bankingId } = useParams();

  // 숫자 입력 필드 이벤트 핸들러
  const handleAmountChange = (e) => {
    const inputAmount = e.target.value.replace(/[^0-9]/g, ""); // 숫자 이외의 문자 제거
    const formattedAmount = formatNumberWithCommas(inputAmount);
    setBankingAmount(formattedAmount);
  };

  const [bankingDetails, setBankingDetails] = useState({});
  const fetchBankingDetails = () => {
    axios
      .get(`http://localhost:9000/banking/read/${bankingId}`)
      .then((response) => {
        setBankingDetails(response.data.data);
        console.log("응답 데이터:", response.data.data);
      })
      .catch((error) => {
        console.log("BankingDetail 데이터를 가져오는 중 오류 발생: ", error);
      });
  };

  useEffect(() => {
    fetchBankingDetails();
  }, []);

  useEffect(() => {
    // bankingDetails가 변경될 때마다 각 입력 필드의 상태 업데이트
    setBankingType(bankingDetails.type);
    setBankingCategory(bankingDetails.category);

    // bankingDetails.bankingDate가 정의되어 있고 길이가 5일 때만 처리
    if (bankingDetails.bankingDate && bankingDetails.bankingDate.length === 5) {
      // bankingDateArray의 요소를 사용하여 Date 객체를 생성하고 상태 업데이트
      const bankingDateArray = bankingDetails.bankingDate;
      const bankingDate = new Date(
        bankingDateArray[0],
        bankingDateArray[1] - 1,
        bankingDateArray[2]
      );
      setBankingDateTime(bankingDate);
    }

    // amount 값이 존재할 때만 toString 메서드 호출
    if (bankingDetails.amount !== undefined) {
      setBankingAmount(bankingDetails.amount.toString()); // 숫자를 문자열로 변경
    }
    setBankingDescription(bankingDetails.content);
  }, [bankingDetails]);

  // 숫자를 1000 단위로 콤마(,)로 포맷하는 함수
  const formatNumberWithCommas = (number) => {
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleBankingSubmit = () => {
    if (!bankingType) {
      alert("분류를 선택하세요.");
      bankingTypeInputRef.current.focus();
      return;
    }

    if (!bankingCategory) {
      alert("카테고리를 선택하세요.");
      bankingCategoryInputRef.current.focus();
      return;
    }

    if (!bankingAmount) {
      alert("금액을 입력하세요.");
      bankingAmountInputRef.current.focus();
      return;
    }

    if (!bankingDescription) {
      alert("내역을 입력하세요.");
      bankingDescriptionInputRef.current.focus();
      return;
    }

    //문제점, 입력시 시간으로 들어감
    const formattedBankingDateTime = format(
      bankingDateTime,
      "yyyy-MM-dd'T'00:00:00.000"
    );
    const amountWithoutCommas = parseInt(bankingAmount.replace(/,/g, ""));
    // const amount = parseInt(amountWithoutCommas);

    const requestData = {
      bankingId: bankingId,
      type: bankingType,
      amount: amountWithoutCommas,
      category: bankingCategory,
      bankingDate: formattedBankingDateTime,
      content: bankingDescription,
      challengeId: null,
    };

    // console.log(bankingDescription);

    axios
      .post("http://localhost:9000/banking/update", requestData)
      .then((response) => {
        if (response.status === 200) {
          console.log("응답 데이터:", response.data);
          alert("가계부가 수정되었습니다.");
          navigate(-1);
        } else if (response.status === 400) {
          console.log(400);
        }
      })
      .catch((error) => {
        console.log("데이터를 가져오는 중 오류 발생: ", error);
      });
  };

  return (
    <BankingTable>
      <thead>
        <tr>
          <th colSpan="2">
            <SectionTitle>가계부 수정</SectionTitle>
            <HorizontalLine />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <FormLabel htmlFor="bankingType">분류</FormLabel>
          </td>
          <td>
            <FormControl>
              <SelectBox
                id="bankingType"
                ref={bankingTypeInputRef}
                value={bankingType}
                onChange={(e) => setBankingType(e.target.value)}
              >
                <option value="" disabled hidden style={{ color: "red" }}>
                  선택하세요
                </option>
                <option value="수입">수입</option>
                <option value="지출">지출</option>
              </SelectBox>
            </FormControl>
          </td>
        </tr>

        <tr>
          <td>
            <FormLabel htmlFor="bankingDateTime">날짜</FormLabel>
          </td>
          <td>
            <FormControl>
              <DatePicker
                id="bankingDateTime"
                locale={ko}
                dateFormat="yyyy.MM.dd (eee)" // 시간 포맷 변경
                showPopperArrow={false} // 화살표 변경
                maxDate={new Date()}
                selected={bankingDateTime}
                onChange={(date) => setBankingDateTime(date)}
                customInput={
                  <div style={{ position: "relative" }}>
                    <Form.Control
                      type="text"
                      value={format(bankingDateTime, "yyyy.MM.dd (eee)")}
                      readOnly
                      style={{
                        marginRight: "4.3rem",
                        fontSize: "1.2rem",
                        textAlign: "left",
                        cursor: "pointer",
                      }}
                    />
                    {/* 캘린더 아이콘 */}
                    <span
                      className="material-symbols-outlined"
                      style={{
                        position: "absolute",
                        top: "50%",
                        right: "1rem",
                        transform: "translateY(-50%)",
                        color: "#888", // 회색 색상
                        cursor: "pointer", // 마우스 커서를 손가락 모양으로 설정
                      }}
                    >
                      calendar_month
                    </span>
                  </div>
                }
              />
            </FormControl>
          </td>
        </tr>

        <tr>
          <td>
            <FormLabel htmlFor="bankingCategory">카테고리</FormLabel>
          </td>
          <td>
            <FormControl>
              <SelectBox
                id="bankingCategory"
                ref={bankingCategoryInputRef}
                value={bankingCategory}
                onChange={(e) => setBankingCategory(e.target.value)}
              >
                <option value="" disabled hidden style={{ color: "#e9e9e9" }}>
                  카테고리 선택
                </option>
                <option value="식비">식비</option>
                <option value="마트/편의점">마트/편의점</option>
                <option value="패션/미용">패션/미용</option>
                <option value="주거/통신">주거/통신</option>
                <option value="병원">병원</option>
                <option value="교통">교통</option>
                <option value="문화생활">문화생활</option>
                <option value="기타">기타</option>
              </SelectBox>
            </FormControl>
          </td>
        </tr>

        <tr>
          <td>
            <FormLabel htmlFor="bankingAmount">금액</FormLabel>
          </td>
          <td>
            <FormControl>
              <Form.Control
                id="bankingAmount"
                type="text"
                placeholder="금액을 입력해주세요"
                value={bankingAmount}
                onChange={handleAmountChange}
                ref={bankingAmountInputRef}
              />
            </FormControl>
          </td>
        </tr>

        <tr>
          <td>
            <FormLabel htmlFor="bankingDescription">내역</FormLabel>
          </td>
          <td>
            <FormControl>
              <Form.Control
                as="textarea"
                id="bankingDescription"
                placeholder="내역을 입력해주세요"
                value={bankingDescription}
                onChange={(e) => setBankingDescription(e.target.value)}
                ref={bankingDescriptionInputRef}
              />
            </FormControl>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="2" style={{ textAlign: "center" }}>
            <SubmitButton onClick={handleBankingSubmit}>수정</SubmitButton>
          </td>
        </tr>
      </tfoot>
    </BankingTable>
  );
}
export default RegisterBanking;

const BankingTable = styled.table`
  width: 40rem;
  margin: 50px auto;
  padding: 40px;
  border-radius: 1.5rem;
  text-align: center;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2); /* 그림자 효과 추가 */
`;

const SectionTitle = styled.h2`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 2.8rem;
  text-align: center;
  margin: 2rem 0 1.5rem 0;
  color: #595b5d;
`;

const HorizontalLine = styled.hr`
  border-top: 3px solid;
  margin: 0 2rem 2rem 2rem;
`;

const FormLabel = styled.label`
  display: block;
  padding: 1rem 2rem 1rem 7rem;
  text-align: left;
  font-weight: bold !important;
  color: #595b5d;
`;

const FormControl = styled.div`
  margin: 1rem 7rem 1rem 2rem;
  text-align: left;
  font-family: "Roboto"; // 폰트 설정
`;

const SelectBox = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin: 5px 0;
  border-color: #ddd;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
`;

const SubmitButton = styled.button`
  background-color: #0064ff;
  color: #fff;
  margin: 2rem;
  padding: 10px 25px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.2s;
  text-align: center;

  &:hover {
    background-color: #0056b3;
  }
`;
