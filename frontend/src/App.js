import {BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from './pages/Register';
import ForgotPassword from "./pages/ForgotPassword";
import VerifyCode from "./pages/VerifyCode";
import SetPassword from "./pages/SetPassword";

function App() {
  return (
    // <div className="App">
    //   <h1>hello</h1>
    // </div>
    <BrowserRouter>
    <Routes>
       <Route path="/" element={<Login />} />
       <Route path="/Register" element={<Register />} />
       <Route path="/ForgotPassword" element={<ForgotPassword />} />
       <Route path="/VerifyCode" element={<VerifyCode />} />
       <Route path="/SetPassword" element={<SetPassword />} />


    </Routes>
    </BrowserRouter>
  );
}

export default App;
