import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { Landing } from "./pages/Landing";
import { Navbar } from "./components/Header";
import { Plans } from "./pages/Plans";
import { Dashboard } from "./pages/Dashboard";

function App() {
  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-b from-slate-900 to-slate-950">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/plans" element={<Plans/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </div>
  );
}

export default App;
