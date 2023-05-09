import { Router, Routes, Route, Link, BrowserRouter } from "react-router-dom";
import Login from "../../Account/Login";
import Profile from "../../Account/Profile";
import Register from "../../Account/Register";
import NotFound from "../../Common/HtmlErrors/NotFound";
import Unauthorized from "../../Common/HtmlErrors/Unauthorized";
import PageToRedirect from "../../Common/TopMenu/PageToRedirect";
import CreateLink from "../../Shorten/CreateLink";
import MyLinksPage from "../../Shorten/MyLinks/MyLinksPage";
import HomePage from "../../Common/HomePage";
import TopMenu from "../../Common/TopMenu";
import "./Routers.css";
import DeleteLinkPage from "../../Shorten/DeleteLinkPage";

export const Routers = () => {
  return (
    <BrowserRouter>
      <TopMenu />
      <div className="app-body">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/CreateLink" element={<CreateLink />} />
          <Route path="/MyLinks" element={<MyLinksPage />} />
          <Route path="/DeleteLink" element={<DeleteLinkPage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Unauthorized" element={<Unauthorized />} />
          <Route path="/NotFound" element={<NotFound />} />
          <Route path="/:shortenedUrl?" element={<PageToRedirect />} />
          <Route path="/Profile/*" element={<Profile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
