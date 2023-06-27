import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./style.scss"
import { UserContext } from "./context/AuthContext";
function App() {
  const user = localStorage.getItem("token")
  return (
    <Routes>
      {user && <Route path="/" exact element={<Home/>}/>}
      <Route path="/register" exact element={<Register/>}/>
      <Route path="/login" exact element={<Login/>}/>
      <Route path="/" exact element={<Navigate replace to="/login"/>}/>
    </Routes>
  );
}

export default App;
