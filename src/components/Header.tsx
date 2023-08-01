import { Button } from "./Button";
import { Squash as Hamburger } from "hamburger-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/icons/logo.svg";

export const Navbar = () => {
  const [displayAside, setDisplayAside] = useState(false);
  return (
    <nav className="absolute w-full z-20">
      <div className="px-6 py-6 flex justify-between items-start m-auto md:justify-between lg:max-w-7xl">
        <span className="relative z-30 hidden md:flex md:items-center md:space-x-3">
          <img src={logo} alt="logotype" className="w-8 h-8" />
          <h6 className="text-slate-200 text-xl font-semibold">ServiHogar</h6>
        </span>
        <div className="md:hidden">
          <div className="fixed z-20 left-0 bg-gradient-to-b from-slate-900 to-transparent w-full top-0 px-6 pt-6 pb-11 flex justify-between">
            <i className="relative z-30 lg:hidden">
              <img src={logo} alt="logotype" className="w-10 h-10" />
            </i>
            <Hamburger
              color="white"
              onToggle={() => setDisplayAside(!displayAside)}
              toggled={displayAside}
            />
          </div>
          <div
            className={`fixed flex flex-col top-0 h-screen w-screen bg-slate-900 bg-opacity-90 backdrop-blur-lg z-10 transition-all duration-300 ease-in-out pt-28 pl-8 ${
              !displayAside ? " -left-full" : "left-0"
            }`}
          >
            <Link to="/" onClick={() => setDisplayAside(false)}>
              <p className="text-slate-200 text-2xl font-bold py-6">Inicio</p>
            </Link>
            <Link to="/login" onClick={() => setDisplayAside(false)}>
              <p className="text-slate-200 text-2xl font-bold py-6">
                Iniciar sesión
              </p>
            </Link>
            <Link to="/signup" onClick={() => setDisplayAside(false)}>
              <p className="text-slate-200 text-2xl font-bold py-6">
                Registrarse
              </p>
            </Link>
          </div>
        </div>
        <div className="hidden md:space-x-10 md:items-center md:flex ">
          <Link to="/" className=" transition duration-150 hover:opacity-80">
            <p className="text-slate-200 font-semibold">Inicio</p>
          </Link>
          <Link
            to="/login"
            className=" transition duration-150 hover:opacity-80"
          >
            <p className="text-slate-200 font-semibold">Iniciar sesión</p>
          </Link>
          <Link to="/signup">
            <Button title="Registrarse" onClick={() => {}} size="small" />
          </Link>
        </div>
      </div>
    </nav>
  );
};
