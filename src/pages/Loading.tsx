import logoIcon from "../assets/icons/logo.svg";
import {useState, useEffect} from "react";

const Loading = () => {
  const [dots, setDots] = useState<string>("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDots((prevDots) => (prevDots === "..." ? "" : prevDots + "."));
    }, 200);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <div className="max-w-7xl m-auto min-w-screen min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 flex">
      <div className="h-full m-auto space-y-6 animate-pulse">
        <div role="status">
          <div className="space-y-4">
            <img src={logoIcon} alt="Logo icon" className="m-auto" loading="lazy"/>
          </div>
        </div>
        <h4 className=" text-4xl font-semibold text-start">
          Cargando{dots}
        </h4>
      </div>
    </div>
  );
};

export default Loading;
