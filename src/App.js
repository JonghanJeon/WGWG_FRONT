// import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./component/common/Navigator";
import Main from "./Main";
import RegisterBanking from "./pages/Banking/RegisterBanking";
import UpdateBanking from "./pages/Banking/UpdateBanking";
import BankingList from "./pages/Banking/BankingList";
import LoginPage from "./pages/User/LoginPage";
import SignUpForm from "./pages/User/SignUpForm";
import InsertArticle from "./pages/Article/InsertAritcle";
import ArticleDetail from "./pages/Article/ArticleDetail";
import ArticleList from "./pages/Article/ArticleList";
import MyArticles from "./pages/User/MyArticles";
import MyChallenges from "./pages/User/MyChallenges";
import MyProfile from "./pages/User/MyProfile";
import EditArticleForm from "./pages/Article/EditArticleForm";
// challenge
import ChallengeInsert from "./pages/challenges/ChallengeInsert";
import CoffeeChallengeInsertBox from "./component/challenges/CoffeeChallengeInsertBox"
import NChallengeInsertBox from "./component/challenges/NChallengeInsertBox"
import ChallengeList from './pages/challenges/ChallengeList';
import ChallengeDetail from './pages/challenges/ChallengeDetail';
import ChallengeUpdate from './pages/challenges/ChallengeUpdate';
import NChallengeParticipate from './pages/challenges/NChallengeParticipate';
import CoffeeChallengeParticipate from './pages/challenges/CoffeeChallengeParticipate';
import CoffeeChallengePayment from './pages/challenges/CoffeeChallengePayment';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<SignUpForm />}></Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/mypage/articles" element={<MyArticles />} />
          <Route path="/mypage/challenges" element={<MyChallenges />} />
          <Route path="/mypage" element={<MyProfile />} />

          <Route path="/articles/insert" element={<InsertArticle />}></Route>
          <Route path="/articles/update/*" element={<EditArticleForm />} />
          <Route path="/articles" element={<ArticleList />}></Route>
          <Route
            path="/articles/:articleId"
            element={<ArticleDetail />}
          ></Route>

          <Route path="/banking" element={<BankingList />} />
          <Route path="/banking/register" element={<RegisterBanking />} />
          <Route
            path="/banking/update/:bankingId"
            element={<UpdateBanking />}
          />

          <Route path="/challenges">
            <Route path="insert" element={<ChallengeInsert />}>
              <Route path="coffee" element={<CoffeeChallengeInsertBox />} />
              <Route path="n" element={<NChallengeInsertBox />} />
            </Route>

            <Route path="list" element={<ChallengeList/>}/>
            <Route path="detail/:challengeId/:challengeType" element={<ChallengeDetail/>}/>
            
            <Route path="update/:challengeId/:challengeType" element={<ChallengeUpdate />}></Route>

            <Route path="participate/:challengeId/N" element={<NChallengeParticipate/>}></Route>
            <Route path="participate/:challengeId/COFFEE" element={<CoffeeChallengeParticipate/>}></Route>

            <Route path="payment/:challengeId" element={<CoffeeChallengePayment/>}/>
          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
