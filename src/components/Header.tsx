import { Button } from "./Button";
import { Squash as Hamburger } from "hamburger-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [displayAside, setDisplayAside] = useState(false);
  return (
    <nav className="absolute w-full">
      <div className="px-6 py-6 flex justify-between m-auto md:justify-end lg:max-w-7xl">
        <div className="md:hidden">
          <div className="fixed z-20 left-0 bg-gradient-to-b from-slate-900 to-transparent w-full top-0 px-6 pt-6 pb-20">
            <Hamburger
              color="white"
              onToggle={() => setDisplayAside(!displayAside)}
            />
          </div>
          <div
            className={`fixed flex flex-col top-0 h-screen w-screen bg-slate-900 bg-opacity-90 backdrop-blur-lg z-10 transition-all duration-300 ease-in-out pt-28 pl-8 ${
              !displayAside ? " -left-full" : "left-0"
            }`}
          >
            <Link to="/login"><p className="text-slate-200 text-2xl font-bold py-6">Inicio</p></Link>
            <Link to="/login"><p className="text-slate-200 text-2xl font-bold py-6">Iniciar sesión</p></Link>
            <Link to="/login"><p className="text-slate-200 text-2xl font-bold py-6">Registrarse</p></Link>
          </div>
        </div>
        <div className="hidden md:block space-x-3">
          <Button
            title="Iniciar sesión"
            
            color="transparent"
            onClick={() => {}}
          />
          <Button title="Registrarse" onClick={() => {}} />
        </div>
      </div>
    </nav>
  );
};
