import { Route, Routes } from "react-router-dom";
import Notes from "../pages/Notes";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Notes />} />
    </Routes>
  );
}
