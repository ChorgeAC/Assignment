import { Route, Routes } from "react-router-dom";
import SignUp from "./component/SignUp";
import Login from "./component/login";
import TeamMember from "./component/teamMember";

export const config = {
  endpoint: `http://localhost:5000/api`,
};

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<TeamMember />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
