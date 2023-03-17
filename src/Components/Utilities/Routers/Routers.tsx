import { Router, Routes, Route, Link, BrowserRouter } from "react-router-dom";
import LoginForm from "../../Account/Login/LoginForm";
import Profile from "../../Account/Profile";
import RegisterForm from "../../Account/Register/RegisterForm";
import NotFound from "../../Common/HtmlErrors/NotFound";
import Unauthorized from "../../Common/HtmlErrors/Unauthorized";
import PageToRedirect from "../../Common/TopMenu/PageToRedirect";
import CreateLink from "../../Shorten/CreateLink";
import MyLinksPage from "../../Shorten/MyLinks/MyLinksPage";
import HomePage from "../../Common/HomePage";
import TopMenu from "../../Common/TopMenu";

export const Routers = () => {
  return (
    <BrowserRouter>
      <TopMenu />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/CreateLink" element={<CreateLink />} />
        <Route path="/MyLinks" element={<MyLinksPage />} />
        <Route path="/Login" element={<LoginForm />} />
        <Route path="/Register" element={<RegisterForm />} />
        <Route path="/Unauthorized" element={<Unauthorized />} />
        <Route path="/NotFound" element={<NotFound />} />
        <Route path="/:shortenedUrl?" element={<PageToRedirect />} />
        <Route path="/Profile/*" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
};
