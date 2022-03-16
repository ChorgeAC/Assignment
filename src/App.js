import SignUp from "./component/SignUp";
import TeamMember from "./component/teamMember";
import { Route, Routes } from "react-router-dom";

export const config = {
  endpoint: `http://localhost:5000/api`,
};

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<TeamMember />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
      </Routes>
    </div>
  );
}

export default App;
