import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Header";
import React, { Suspense } from "react";
import Loading from "./pages/Loading";
import ServiceDetail from "./pages/ServiceDetail";
import WorkerDetail from "./pages/WorkerDetail";

const Landing = React.lazy(() => import("./pages/Landing"));
const Login = React.lazy(() => import("./pages/Login"));
const SignUp = React.lazy(() => import("./pages/SignUp"));
const Plans = React.lazy(() => import("./pages/Plans"));
const Home = React.lazy(() => import("./pages/Home"));
const Confirmation = React.lazy(() => import("./pages/Confirmation"));

function App() {

  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-b from-slate-900 to-slate-950 text-slate-200">
      <Suspense fallback={<Loading />}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/home" element={<Home />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/worker/:id" element={<WorkerDetail/>}/>
          <Route path="/service/:id" element={<ServiceDetail/>}/>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
