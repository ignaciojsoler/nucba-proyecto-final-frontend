import { Button } from "./Button";
import { Squash as Hamburger } from "hamburger-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/icons/logo.svg";

const navLinks = [
  { path: "/home", text: "Inicio" },
  { path: "/categories", text: "Explorar" },
  { path: "/login", text: "Iniciar sesión" },
];

export const Navbar = () => {
  const [displayAside, setDisplayAside] = useState(false);

  const closeAside = () => {
    setDisplayAside(false);
  };

  const renderNavLinks = () => {
    return navLinks.map((link) => (
      <Link to={link.path} key={link.path} onClick={closeAside}>
        <p className=" text-2xl font-bold py-6 md:font-semibold md:py-0 md:text-base">{link.text}</p>
      </Link>
    ));
  };

  return (
    <nav className="absolute w-full z-20">
      <div className="px-6 py-6 flex justify-between items-start m-auto md:justify-between lg:max-w-7xl">
        <Link to="/home">
          <span className="relative z-30 hidden md:flex md:items-center md:space-x-3">
            <img src={logo} alt="Logotype" className="w-8 h-8" loading="lazy" />
            <h6 className=" text-xl font-semibold">ServiHogar</h6>
          </span>
        </Link>
        <div className="md:hidden">
          <div className="fixed z-20 left-0 bg-gradient-to-b from-slate-900 to-transparent w-full top-0 px-6 pt-6 pb-11 flex justify-between">
            <i className="relative z-30 lg:hidden">
              <img
                src={logo}
                alt="Logotype"
                className="w-10 h-10"
                loading="lazy"
              />
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
            {renderNavLinks()}
          </div>
        </div>
        <div className="hidden md:space-x-10 md:items-center md:flex">
          {renderNavLinks()}
          <Link to="/plans">
            <Button title="Registrarse" onClick={() => {}} size="small" />
          </Link>
        </div>
      </div>
    </nav>
  );
};
