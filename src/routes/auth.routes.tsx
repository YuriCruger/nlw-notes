import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import CreateAccount from "../pages/CreateAccount";

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/createaccount" element={<CreateAccount />} />
    </Routes>
  );
}
