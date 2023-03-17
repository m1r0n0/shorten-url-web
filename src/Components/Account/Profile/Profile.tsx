import { Link, Route, Routes } from "react-router-dom";
import ChangeEmail from "./ChangeEmail";

export const Profile = () => {
  return (
    <>
      <div>
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
        <Route
          path="/ChangeEmail"
          element={<ChangeEmail />}
        />
      </Routes>
    </>
  );
};
