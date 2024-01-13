import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../App.css";

export default function Navigator() {
  const [userSeq, setUserSeq] = useState(sessionStorage.getItem("userSeq"));
  const [nickName, setNickName] = useState(sessionStorage.getItem("nickName"));

  useEffect(() => {
    setUserSeq(sessionStorage.getItem("userSeq"));
    setNickName(sessionStorage.getItem("nickName"));
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("userSeq");
    sessionStorage.removeItem("nickName");

    alert("로그아웃 되었습니다.");

    window.location.reload();
    window.location.href = "/";
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light shadow">
        <div className="container d-flex justify-content-between align-items-center">
          <Link
            to="/"
            className="navbar-brand text-success logo h1 align-self-center"
          >
            WGWG
          </Link>

          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#templatemo_main_nav"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="align-self-center collapse navbar-collapse flex-fill d-lg-flex justify-content-lg-between"
            id="templatemo_main_nav"
          >
            <div className="collapse navbar-collapse justify-content-end">
              {!userSeq ? (
                <ul className="nav navbar-nav mr-13">
                  <li className="nav-item">
                    <Link to="/" className="nav-link">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/signup" className="nav-link">
                      회원가입
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">
                      로그인
                    </Link>
                  </li>
                </ul>
              ) : (
                <ul className="nav navbar-nav mr-13">
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      style={{
                        fontWeight: "bold",
                        textDecoration: "underline",
                      }}
                    >
                      {nickName}님
                    </a>
                  </li>
                  <li className="nav-item">
                    <Link to="/" className="nav-link">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/articles" className="nav-link">
                      게시판
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/challenges/list" className="nav-link">
                      챌린지
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/mypage" className="nav-link">
                      마이페이지
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      onClick={handleLogout}
                      style={{ cursor: "pointer" }}
                    >
                      로그아웃
                    </a>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
