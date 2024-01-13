import Navigator from "./component/common/Navigator";
import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
// import "./templatemo.css";
import banner_img_01 from "./assets/img/banner_img_01.jpg";
import banner_img_02 from "./assets/img/banner_img_02.jpg";
import banner_img_03 from "./assets/img/banner_img_03.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

export default function Main() {
  // 현재 활성 슬라이드의 인덱스를 관리하는 상태 변수
  const [activeIndex, setActiveIndex] = useState(0);

  // 슬라이드 변경 이벤트 핸들러 함수
  const handleSelect = (selectedIndex, e) => {
    setActiveIndex(selectedIndex);
  };

  const carouselStyle = {
    backgroundColor: "#efefef", // 원하는 배경색을 여기에 지정
  };

  return (
    <div>
      <Navigator />
      {/* test 시작 */}
      {/* Carousel 컴포넌트 */}
      <Carousel activeIndex={activeIndex} onSelect={handleSelect}>
        <Carousel.Item>
          {/* 첫 번째 슬라이드 내용 */}
          <div className="container">
            <div className="row p-5">
              <div className="mx-auto col-md-8 col-lg-6 order-lg-last">
                <img className="img-fluid" src={banner_img_01} alt="Banner 1" />
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
        </Carousel.Item>
        <Carousel.Item>
          {/* 두 번째 슬라이드 내용 */}
          <div className="container">
            <div className="row p-5">
              <div className="mx-auto col-md-8 col-lg-6 order-lg-last">
                <img className="img-fluid" src={banner_img_02} alt="Banner 2" />
              </div>
              <div className="col-lg-6 mb-0 d-flex align-items-center">
                <div className="text-align-left">
                  <h1 className="h1">챌린지 성공 시 리워드 지급</h1>
                  <h3 className="h2">dddd</h3>
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
        </Carousel.Item>
        <Carousel.Item>
          {/* 세 번째 슬라이드 내용 */}
          <div className="container">
            <div className="row p-5">
              <div className="mx-auto col-md-8 col-lg-6 order-lg-last">
                <img className="img-fluid" src={banner_img_03} alt="Banner 3" />
              </div>
              <div className="col-lg-6 mb-0 d-flex align-items-center">
                <div className="text-align-left">
                  <h1 className="h1">짠MZ 여기로 모여라!</h1>
                  <h3 className="h2">
                    절약과 저축에 관심많은 MZ가 모인 게시판
                  </h3>
                  <p>
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
        </Carousel.Item>
      </Carousel>
      <a
        className="carousel-control-prev"
        href="#template-mo-zay-hero-carousel"
        role="button"
        data-slide="prev"
        style={{ textDecoration: "none" }}
        onClick={() =>
          setActiveIndex((prevIndex) => (prevIndex === 0 ? 2 : prevIndex - 1))
        }
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        href="#template-mo-zay-hero-carousel"
        role="button"
        data-slide="next"
        style={{ textDecoration: "none" }}
        onClick={() =>
          setActiveIndex((prevIndex) => (prevIndex === 2 ? 0 : prevIndex + 1))
        }
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
      {/* test 끝 */}
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
                  <img className="img-fluid" src={banner_img_01} />
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
                  <img
                    className="img-fluid"
                    src="./assets/img/banner_img_02.jpg"
                    alt
                  />
                </div>
                <div className="col-lg-6 mb-0 d-flex align-items-center">
                  <div className="text-align-left">
                    <h1 className="h1">챌린지 성공 시 리워드 지급</h1>
                    <h3 className="h2">dddd</h3>
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
                <div className="mx-auto col-md-8 col-lg-6 order-lg-last">
                  <img
                    className="img-fluid"
                    src="./assets/img/banner_img_03.jpg"
                    alt
                  />
                </div>
                <div className="col-lg-6 mb-0 d-flex align-items-center">
                  <div className="text-align-left">
                    <h1 className="h1">짠MZ 여기로 모여라!</h1>
                    <h3 className="h2">
                      절약과 저축에 관심많은 MZ가 모인 게시판
                    </h3>
                    <p>
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
      {/* End Banner Hero */} {/* Start Section */}
      <section className="container py-5">
        <div className="row text-center pt-5 pb-3">
          <div className="col-lg-6 m-auto">
            <h1 className="h1">Our Services</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod Lorem ipsum dolor sit amet.
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-lg-3 pb-5">
            <div className="h-100 py-5 services-icon-wap shadow">
              <div className="h1 text-success text-center">
                <span className="material-symbols-outlined text-icon">
                  diversity_3
                </span>
              </div>
              <h2 className="h5 mt-4 text-center">챌린지</h2>
            </div>
          </div>
          <div className="col-md-6 col-lg-3 pb-5">
            <div className="h-100 py-5 services-icon-wap shadow">
              <div className="h1 text-success text-center">
                <span className="material-symbols-outlined text-icon">
                  receipt_long
                </span>
              </div>
              <h2 className="h5 mt-4 text-center">가계부</h2>
            </div>
          </div>
          <div className="col-md-6 col-lg-3 pb-5">
            <div className="h-100 py-5 services-icon-wap shadow">
              <div className="h1 text-success text-center">
                <span className="material-symbols-outlined text-icon">
                  forum
                </span>
              </div>
              <h2 className="h5 mt-4 text-center">게시판</h2>
            </div>
          </div>
          <div className="col-md-6 col-lg-3 pb-5">
            <div className="h-100 py-5 services-icon-wap shadow">
              <div className="h1 text-success text-center">
                <span className="material-symbols-outlined text-icon">
                  flag
                </span>
              </div>
              <h2 className="h5 mt-4 text-center">마이 챌린지</h2>
            </div>
          </div>
        </div>
      </section>
      {/* End Section */} {/* Start Footer */}
      <footer className="bg-dark" id="tempaltemo_footer">
        <div className="container">
          <div className="row">
            <div className="col-md-4 pt-5">
              <h2 className="h2 text-success border-bottom pb-3 border-light logo">
                WGWG
              </h2>
              <ul className="list-unstyled text-light footer-link-list">
                <li>
                  <i className="fas fa-map-marker-alt fa-fw" />
                  428, Seolleung-ro, Gangnam-gu, Seoul
                </li>
                <li>
                  <i className="fa fa-phone fa-fw" />
                  <a className="text-decoration-none" href="tel:010-000-0000">
                    010-1544-9001
                  </a>
                </li>
                <li>
                  <i className="fa fa-envelope fa-fw" />
                  <a
                    className="text-decoration-none"
                    href="wgwg@kbitsyourlife.com"
                  >
                    wgwg@kbitsyourlife.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="w-100 bg-black py-3">
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
    </div>
  );
}
