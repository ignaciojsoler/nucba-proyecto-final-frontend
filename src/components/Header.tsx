import { Button } from "./Button";
import { Squash as Hamburger } from "hamburger-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [displayAside, setDisplayAside] = useState(false);
  return (
    <nav className="absolute w-full z-10">
      <div className="px-6 py-6 flex justify-between m-auto md:justify-end lg:max-w-7xl">
        <div className="md:hidden">
          <div className="fixed z-20 left-0 bg-gradient-to-b from-slate-900 to-transparent w-full top-0 px-6 pt-6 pb-11">
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
            <Link to="/"><p className="text-slate-200 text-2xl font-bold py-6">Inicio</p></Link>
            <Link to="/login"><p className="text-slate-200 text-2xl font-bold py-6">Iniciar sesión</p></Link>
            <Link to="/signup"><p className="text-slate-200 text-2xl font-bold py-6">Registrarse</p></Link>
          </div>
        </div>
        <div className="hidden md:space-x-10 md:items-center md:flex ">
        <Link to="/" className=" transition duration-150 hover:opacity-80"><p className="text-slate-200 font-semibold">Inicio</p></Link>
        <Link to="/login" className=" transition duration-150 hover:opacity-80"><p className="text-slate-200 font-semibold" >Iniciar sesión</p></Link>
        <Link to="/signup"><Button title="Registrarse" onClick={() => {}} size="small"/></Link>
          
        </div>
      </div>
    </nav>
  );
};
