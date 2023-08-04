import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Header";
import React, { Suspense, useState, useEffect } from "react";
import Loading from "./pages/Loading";

const Landing = React.lazy(() => import("./pages/Landing"));
const Login = React.lazy(() => import("./pages/Login"));
const SignUp = React.lazy(() => import("./pages/SignUp"));
const Plans = React.lazy(() => import("./pages/Plans"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Confirmation = React.lazy(() => import("./pages/Confirmation"));

function App() {
  const [loadingPercentage, setLoadingPercentage] = useState<number>(0);

  useEffect(() => {
    const handleProgress = (event: ProgressEvent) => {
      if (event.lengthComputable) {
        const percentComplete = (event.loaded / event.total) * 100;
        setLoadingPercentage(percentComplete);
      }
    };

    window.addEventListener("progress", handleProgress);
    window.addEventListener("load", () => setLoadingPercentage(100));

    return () => {
      window.removeEventListener("progress", handleProgress);
      window.removeEventListener("load", () => setLoadingPercentage(100));
    };
  }, []);

  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-b from-slate-900 to-slate-950 text-slate-200">
      <Navbar />
      <Suspense fallback={<Loading loadingPercentage={loadingPercentage} />}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
