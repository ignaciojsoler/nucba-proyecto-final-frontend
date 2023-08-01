import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { Landing } from "./pages/Landing";

function App() {
  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-b from-slate-900 to-slate-950">
      <Routes>
        <Route path="" element={<Landing/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
      </Routes>
    </div>
  );
}

export default App;
