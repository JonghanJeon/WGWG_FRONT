import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import banner_img_01 from "./assets/img/banner_img_01.jpg";
import banner_img_02 from "./assets/img/banner_img_02.jpg";
import banner_img_03 from "./assets/img/banner_img_03.jpg";
import "./templatemo.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import styled from "styled-components";

export default function Main() {
  const userSeq = sessionStorage.getItem("userSeq");

  const movePage = useNavigate();
  function handleLinkToChallenge() {
    movePage("/challenges/list");
  }

  function handleLinkToBanking() {
    movePage("/banking");
  }

  function handleLinkToArticles() {
    movePage("/articles");
  }

  function handleLinkToMyChallenge() {
    movePage("/mypage/challenge");
  }

  return (
    <>
      {/* Start Banner Hero */}
      <div
        id="template-mo-zay-hero-carousel"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <ol className="carousel-indicators">
          <li
            data-bs-target="#template-mo-zay-hero-carousel"
            // data-bs-slide-to="{0}"
            data-bs-slide-to="0"
            className="active"
            style={{ listStyle: "none" }}
          />
          <li
            data-bs-target="#template-mo-zay-hero-carousel"
            // data-bs-slide-to="{1}"
            data-bs-slide-to="1"
            style={{ listStyle: "none" }}
          />
          <li
            data-bs-target="#template-mo-zay-hero-carousel"
            // data-bs-slide-to="{2}"
            data-bs-slide-to="2"
            style={{ listStyle: "none" }}
          />
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="container">
              <div className="row p-5">
                <div className="mx-auto col-md-8 col-lg-6 order-lg-last">
                  <img className="img-fluid" src={banner_img_01} alt="first" />
                </div>
                <div className="col-lg-6 mb-0 d-flex align-items-center">
                  <div className="text-align-left align-self-center">
                    <h1 className="h1 text-success">
                      <b>Coffee &amp; N</b> Challenge
                    </h1>
                    <h3 className="h2">초단기 적금/절약 챌린지</h3>
                    <p>
                      <br />
                      티끌모아 태산!
                      <br />
                      매일 한 잔의 커피값을 꾸준히 모아보세요!
                      <br />
                      사람들과 함께하며 동기부여를 얻는
                      <strong>절약 챌린지!</strong>
                      <br />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="container">
              <div className="row p-5">
                <div className="mx-auto col-md-8 col-lg-6 order-lg-last">
                  <img className="img-fluid" src={banner_img_02} alt="second" />
                </div>
                <div className="col-lg-6 mb-0 d-flex align-items-center">
                  <div className="text-align-left">
                    <h1 className="h1 text-success">
                      챌린지를 통한 <b>짠테크</b>까지!
                    </h1>
                    <h3 className="h2">챌린지 성공 시 리워드 지급</h3>
                    <p>
                      <br />
                      챌린지 성공 시 모인 금액을 분배하여
                      <strong>리워드</strong>로 지급해드립니다!
                      <br />
                      소비 습관을 점검하며 동시에 짠테크까지 가능한 WGWG!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="container">
              <div className="row p-5">
                <div
                  className="mx-auto col-md-8 col-lg-6 order-lg-last"
                  style={{ marginTop: "0.56rem", marginBottom: "0.56rem" }}
                >
                  <img className="img-fluid" src={banner_img_03} alt="third" />
                </div>
                <div className="col-lg-6 mb-0 d-flex align-items-center">
                  <div className="text-align-left">
                    <h1 className="h1 text-success">
                      <b>짠MZ</b> 여기로 모여라!
                    </h1>
                    <h3 className="h2">
                      절약과 저축에 관심많은 MZ가 모인 게시판
                    </h3>
                    <p>
                      <br />
                      살까말까 고민되신다면 유저에게 물어보세요!
                      <br />
                      사람들과 지출을 공유하며 칭찬과 피드백을 받아보세요!
                      <br />
                      검소한 소비나 무지출을 자랑하며 절약 팁을 공유해보세요!
                      <br />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <a
          className="carousel-control-prev text-decoration-none w-auto ps-3"
          href="#template-mo-zay-hero-carousel"
          role="button"
          data-bs-slide="prev"
        >
          <span className="material-symbols-outlined"> navigate_before </span>
        </a>
        <a
          className="carousel-control-next text-decoration-none w-auto pe-3"
          href="#template-mo-zay-hero-carousel"
          role="button"
          data-bs-slide="next"
        >
          <span className="material-symbols-outlined"> navigate_next </span>
        </a>
      </div>
      {/* End Banner Hero */}

      {/* Start Section */}
      {userSeq ? (
        <section className="container py-5">
          <div className="row text-center pt-5 pb-3">
            <div className="col-lg-6 m-auto">
              <h2 className="h2 text-success" style={{ fontWeight: "bold" }}>
                현명한 소비를 돕는 No.1 서비스
              </h2>
              <p>
                챌린지부터 가계부, 커뮤니티까지! <br />
                모든 서비스를 통합한 WGWG에서 편리하게 만나보세요
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-lg-3 pb-5">
              <MainButtonBox onClick={handleLinkToChallenge}>
                <div className="h-100 py-5 services-icon-wap shadow">
                  <div className="h1 text-success text-center">
                    <span className="material-symbols-outlined text-icon">
                      diversity_3
                    </span>
                  </div>
                  <h2 className="h5 mt-4 text-center">챌린지</h2>
                </div>
              </MainButtonBox>
            </div>

            <div className="col-md-6 col-lg-3 pb-5">
              <MainButtonBox onClick={handleLinkToBanking}>
                <div className="h-100 py-5 services-icon-wap shadow">
                  <div className="h1 text-success text-center">
                    <span className="material-symbols-outlined text-icon">
                      receipt_long
                    </span>
                  </div>
                  <h2 className="h5 mt-4 text-center">가계부</h2>
                </div>
              </MainButtonBox>
            </div>
            <div className="col-md-6 col-lg-3 pb-5">
              <MainButtonBox onClick={handleLinkToArticles}>
                <div className="h-100 py-5 services-icon-wap shadow">
                  <div className="h1 text-success text-center">
                    <span className="material-symbols-outlined text-icon">
                      forum
                    </span>
                  </div>
                  <h2 className="h5 mt-4 text-center">게시판</h2>
                </div>
              </MainButtonBox>
            </div>
            <div className="col-md-6 col-lg-3 pb-5">
              <MainButtonBox onClick={handleLinkToMyChallenge}>
                <div className="h-100 py-5 services-icon-wap shadow">
                  <div className="h1 text-success text-center">
                    <span className="material-symbols-outlined text-icon">
                      flag
                    </span>
                  </div>
                  <h2 className="h5 mt-4 text-center">마이 챌린지</h2>
                </div>
              </MainButtonBox>
            </div>
          </div>
        </section>
      ) : (
        <div />
      )}
      {/* End Section */}
      {/* Start Footer */}
      <footer className="bg-footer" id="tempaltemo_footer">
        <div className="w-100 bg-footer py-3">
          <div className="container">
            <div className="row pt-2">
              <div className="col-12">
                <p className="text-left text-light">
                  Copyright © 2023 ShinSaImDang
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* End Footer */}
    </>
  );
}

const MainButtonBox = styled.div`
  cursor: pointer;
`;
