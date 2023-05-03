import { Link, Route, Routes } from "react-router-dom";
import ChangeEmail from "./ChangeEmail";
import ChangePassword from "./ChangePassword";

export const Profile = () => {
  return (
    <>
      <div className="d-flex align-items-center justify-content-center">
        <ul>
          <li>
            <Link to="/Profile/ChangeEmail">Change Email</Link>
          </li>
          <li>
            <Link to="/Profile/ChangePassword">Change Password</Link>
          </li>
        </ul>
      </div>
      <Routes>
        <Route path="/ChangeEmail" element={<ChangeEmail />} />
        <Route path="/ChangePassword" element={<ChangePassword />} />
      </Routes>
    </>
  );
};
