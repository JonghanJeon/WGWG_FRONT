import React, { useState, useRef, forwardRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { addMonths, subMonths } from "date-fns";
import axios from "axios";
import { ResponsivePie } from "@nivo/pie";
import Pagination from "react-js-pagination";

function BankingList() {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [bankingList, setBankingList] = useState([]);
  const datePickerRef = useRef(null);
  const today = new Date();
  const userSeq = sessionStorage.getItem("userSeq");
  const navigate = useNavigate();

  // const [currentPage, setCurrentPage] = useState(0);
  const ITEMS_PER_PAGE = 10; // 페이지당 항목 수
  const [totalPages, setTotalPages] = useState(1); // 총 페이지 수
  const [totalElements, setTotalElements] = useState(0); // 전체 항목 수

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);

    // 페이지 변경 시 데이터를 다시 가져오도록 fetchBankingList 함수 호출
    fetchBankingList(selectedMonth, pageNumber);
  };

  // function handlePageClick(data) {
  //   const selectedPage = data.selected;
  //   setCurrentPage(selectedPage);

  //   // 페이지 번호가 0부터 시작하므로 1을 더해줍니다.
  //   handlePageChange(selectedPage + 1);
  // }

  function handleLinkToRegister() {
    navigate("/banking/register");
  }

  function formatBankingDate(bankingDateArray) {
    if (Array.isArray(bankingDateArray) && bankingDateArray.length >= 3) {
      const year = bankingDateArray[0];
      const month = String(bankingDateArray[1]).padStart(2, "0");
      const day = String(bankingDateArray[2]).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
    return ""; // 날짜 배열이 올바르지 않은 경우 빈 문자열 반환
  }

  const handleMonthChange = (date) => {
    setSelectedMonth(date);

    // 선택한 달의 데이터를 가져오도록 fetchBankingList 함수 호출
    fetchBankingList(date);
  };

  useEffect(() => {
    fetchBankingList(selectedMonth, page);
  }, [selectedMonth, page]);

  const fetchBankingList = (selectedDate, pageNumber) => {
    const requestData = {
      bankingDate: selectedDate.toISOString(),
      userSeq: userSeq,
      page: pageNumber - 1, // Spring Boot는 페이지 번호가 0부터 시작하므로 1을 빼줍니다.
      size: ITEMS_PER_PAGE, // 페이지당 항목 수
    };

    axios
      .post(
        "http://localhost:9000/banking/read?page=" + pageNumber,
        requestData
      )
      .then((response) => {
        setBankingList(response.data.data.content);
        setTotalPages(response.data.data.totalPages);
        setTotalElements(response.data.data.totalElements);
        console.log(response.data);
        console.log("응답 데이터:", response.data.data.content);
      })
      .catch((error) => {
        console.log("데이터를 가져오는 중 오류 발생: ", error);
      });
  };
  // console.log(bankingList);

  // 가계부 항목 수정 및 삭제 함수
  const handleEdit = (bankingId) => {
    navigate(`/banking/update/${bankingId}`);
  };

  const handleDelete = (bankingId) => {
    console.log(bankingId);
    // 사용자 확인을 위한 확인 대화 상자 표시
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      // 삭제 요청을 보내는 코드
      axios
        .delete(`http://localhost:9000/banking/delete/${bankingId}`)
        .then((response) => {
          console.log(`항목 ID ${bankingId} 삭제 완료`);
          // 삭제된 항목을 화면에서 업데이트
          fetchBankingList(selectedMonth);
        })
        .catch((error) => {
          console.log(`항목 ID ${bankingId} 삭제 중 오류 발생:`, error);
        });
    }
  };

  const handleRightArrowClick = (e) => {
    e.stopPropagation();
    const nextMonth = addMonths(selectedMonth, 1);
    // 미래의 달로 이동할 때만 변경
    if (nextMonth <= today) {
      setSelectedMonth(nextMonth);
    }
  };

  const toggleDatePicker = () => {
    setIsDatePickerOpen(!isDatePickerOpen);
  };

  // DatePicker 컴포넌트 렌더링을 커스텀하는 함수
  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <CustomDateInput onClick={toggleDatePicker}>
      <LeftArrow
        onClick={(e) => {
          e.stopPropagation();
          setSelectedMonth(subMonths(selectedMonth, 1));
        }}
      >
        &#8249;
      </LeftArrow>
      {value}
      <RightArrow onClick={handleRightArrowClick}>&#8250;</RightArrow>
    </CustomDateInput>
  ));

  return (
    <BankingBox>
      <SectionTitle>가계부</SectionTitle>
      <HorizontalLine />
      <FormControl>
        <DatePickerContainer>
          <StyledDatePicker
            selected={selectedMonth}
            onChange={handleMonthChange}
            dateFormat="yyyy년 MM월"
            showMonthYearPicker
            locale={ko}
            popperPlacement="top-start"
            popperModifiers={{
              offset: {
                enabled: true,
                offset: "0, 10px",
              },
              preventOverflow: {
                enabled: true,
                escapeWithReference: false,
                boundariesElement: "viewport",
              },
            }}
            customInput={<CustomInput />}
            open={isDatePickerOpen}
            ref={datePickerRef}
            maxDate={new Date()}
          />
        </DatePickerContainer>

        <RegisterButton onClick={handleLinkToRegister}>
          + 가계부 등록
        </RegisterButton>
      </FormControl>

      <FormControl>
        <ChartLabel>📊통계</ChartLabel>
        <TotalSpendLabel>💸9월 총 소비</TotalSpendLabel>
      </FormControl>
      <ChartControl>
        <ChartContainer>
          {/* <Pie data={data} options={options} /> */}
        </ChartContainer>
      </ChartControl>
      <TotalSpendValue>230,450</TotalSpendValue>

      <BankingListControl>
        <h3>가계부</h3>
        <HorizontalLine />
        {totalElements > 0 ? (
          <>
            <StyledTable>
              <thead>
                <tr>
                  <StyledTH>날짜</StyledTH>
                  <StyledTH>카테고리</StyledTH>
                  <StyledTH>내역</StyledTH>
                  <StyledTH>금액</StyledTH>
                  <StyledTH>수정/삭제</StyledTH>
                </tr>
              </thead>
              <tbody>
                {bankingList.map((transaction) => (
                  <tr key={transaction.bankingId}>
                    <StyledTD>
                      {formatBankingDate(transaction.bankingDate)}
                    </StyledTD>
                    <StyledTD>{transaction.category}</StyledTD>
                    <StyledTD>{transaction.content}</StyledTD>
                    <StyledTD>
                      {transaction.type === "수입" ? (
                        <span style={{ color: "red" }}>
                          +{transaction.amount.toLocaleString()}
                        </span>
                      ) : (
                        <span style={{ color: "blue" }}>
                          -{transaction.amount.toLocaleString()}
                        </span>
                      )}
                    </StyledTD>
                    <StyledTD>
                      <EditButton
                        onClick={() => handleEdit(transaction.bankingId)}
                      >
                        수정
                      </EditButton>
                      <DeleteButton
                        onClick={() => handleDelete(transaction.bankingId)}
                      >
                        삭제
                      </DeleteButton>
                    </StyledTD>
                  </tr>
                ))}
              </tbody>
            </StyledTable>
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
          </>
        ) : (
          <h4>
            데이터가 없습니다. <br />
            가계부를 작성해보세요!
          </h4>
        )}
      </BankingListControl>
    </BankingBox>
  );
}
export default BankingList;

const BankingBox = styled.div`
  max-width: 48rem;
  margin: 5rem auto;
  padding: 40px;
  border-radius: 1.5rem;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2); /* 그림자 효과 추가 */
`;

const SectionTitle = styled.h2`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 2.8rem;
  text-align: center;
  color: #595b5d;
`;

const HorizontalLine = styled.hr`
  border-top: 3px solid;
  margin: 2rem 0.5rem;
`;

const FormControl = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center; /* 아이템 수직 중앙 정렬 */
  margin: 1rem 0 0 0;
  font-family: "Roboto"; // 폰트 설정
`;

const DatePickerContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  text-align: left;
  margin: 0 0 0 2rem;
`;

const StyledDatePicker = styled(DatePicker)`
  display: block; /* 커스텀 입력 컴포넌트를 가로로 정렬 */
  font-size: 1.5rem;
  color: #333;
`;

const CustomDateInput = styled.div`
  background: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: #333;
  text-decoration: none;
`;

const LeftArrow = styled.button`
  cursor: pointer;
  font-size: 1.5rem;
  margin-right: 0.5rem;
  background: none;
  border: none;
  color: #333;
  padding: 0;
`;

const RightArrow = styled.button`
  cursor: pointer;
  font-size: 1.5rem;
  margin-left: 0.5rem;
  background: none;
  border: none;
  color: #333;
  padding: 0;
`;

const RegisterButton = styled.button`
  background-color: #0064ff;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.2s;
  padding: 7px 18px;
  margin-left: auto;

  &:hover {
    background-color: #0056b3;
  }
`;

const ChartLabel = styled.div`
  display: flex;
  margin: 0 0 0 3rem;
  //   justify-content: flex-end;
  text-align: left;
`;

const ChartControl = styled.div`
  display: flex;
  flex-direction: row; /* 가로 정렬 */
  font-family: "Roboto"; // 폰트 설정
  align-items: flex-start; /* 세로 정렬 시작 위치 설정 */
`;

const ChartContainer = styled.div`
  position: relative; /* 상대 위치 설정 */
  max-width: 300px; /* 원하는 최대 너비 설정 */
  height: 300px; /* 원하는 높이 설정 */

  // position: relative; /* 상대 위치 설정 */
  // display: flex;
  // flex: 1;
  // justify-content: flex-end;
  // max-width: 300px; /* 원하는 최대 너비 설정 */
  // height: 300px; /* 원하는 높이 설정 */
`;

const TotalSpendLabel = styled.div`
  margin: 4rem 5rem 0 auto;
  font-size: 1.5rem !important;
  font-weight: bold !important;
`;

const TotalSpendValue = styled.div`
  padding: 7px 18px;
  margin-right: 5rem;
  font-size: 2rem !important;
  font-weight: bold !important;
  text-align: right !important;
`;

const BankingListControl = styled.div`
  margin: 1rem 0 0 0;
  font-family: "Roboto"; // 폰트 설정
  position: relative; /* 상대 위치 설정 */
  top: 20px; /* 원하는 만큼 상단으로 이동시켜 겹침을 방지합니다. */
`;

const StyledTable = styled.table`
  width: 100%;
  margin: 2rem;
  padding: 1rem;
  border: 1px solid #b9b9b9;
  border-radius: 0.5rem;
  border-collapse: collapse;
  width: 90%;
`;

const StyledTH = styled.th`
  background: rgba(0, 0, 0, 0.06);
  text-align: center;
  border: 1px solid #b9b9b9;
  width: 20%;
  height: 2.25rem;
  border-radius: 0.25rem;
`;

const StyledTD = styled.td`
  text-align: center;
  border: 1px solid #b9b9b9;
  width: 20%;
  height: 2.25rem;
`;

const EditButton = styled.button`
  background-color: rgba(31, 119, 255, 0.9);
  color: white;
  border-radius: 0.25rem;
  border: none;
  font-size: 12px;
  margin-right: 0.5rem;
  height: 1.5rem;
  width: 2.5rem;
`;

const DeleteButton = styled.button`
  background-color: rgba(255, 156, 156, 0.9);
  color: white;
  border-radius: 0.25rem;
  border: none;
  font-size: 12px;
  height: 1.5rem;
  width: 2.5rem;
`;

const PaginationBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;
