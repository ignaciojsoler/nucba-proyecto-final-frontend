import { Button } from "./Button";
import { Squash as Hamburger } from "hamburger-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/icons/logo.svg";
import { useEffect } from "react";
import { tokenExists } from "../helpers/jwtUtils";
import UserAvatarDropdown from "./UserAvatarDropdown";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { logOut } from "../helpers/logOut";

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { name } = useSelector((state: RootState) => state.user);

  const [displayAside, setDisplayAside] = useState(false);
  const [isLoggedIn, setisLoggedIn] = useState<boolean>(false);

  const navLinks = isLoggedIn
    ? [
        { path: "/home", text: "Inicio" },
        { path: "/categories", text: "Explorar" },
      ]
    : [
        { path: "/home", text: "Inicio" },
        { path: "/categories", text: "Explorar" },
        { path: "/login", text: "Iniciar sesión" },
      ];

  const closeAside = () => {
    setDisplayAside(false);
  };

  const renderNavLinks = () => {
    return navLinks.map((link) => (
      <Link to={link.path} key={link.path} onClick={closeAside}>
        <p className=" text-2xl font-bold py-6 transition duration-150 md:font-semibold md:py-0 md:text-base hover:opacity-70">
          {link.text}
        </p>
      </Link>
    ));
  };

  useEffect(() => {
    const token = tokenExists();
    if (token) {
      setisLoggedIn(true);
    } else {
      setisLoggedIn(false);
    }
  }, [location]);

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
            className={`fixed flex flex-col top-0 h-screen w-screen bg-slate-900 bg-opacity-90 backdrop-blur-3xl z-10 transition-all duration-300 ease-in-out pt-28 pl-8 ${
              !displayAside ? " -left-full" : "left-0"
            }`}
          >
            {renderNavLinks()}
            {isLoggedIn ? (
              <>
                {" "}
                <Link to="/profile" onClick={closeAside}>
                  <p className=" text-2xl font-bold py-6 md:font-semibold md:py-0 md:text-base">
                    Perfil
                  </p>
                </Link>
                <p
                  className="cursor-pointer text-2xl font-bold py-6 md:font-semibold md:py-0 md:text-base"
                  onClick={() => {
                    closeAside()
                    logOut(navigate)
                  }}
                >
                  Cerrar sesión
                </p>
              </>
            ) : (
              <p
                  className="cursor-pointer text-2xl font-bold py-6 md:font-semibold md:py-0 md:text-base"
                  onClick={() => {
                    closeAside()
                    navigate("/plans")
                  }}
                >
                  Registrarse
                </p>
            )}
          </div>
        </div>
        <div className="hidden md:space-x-10 md:items-center md:flex">
          {renderNavLinks()}
          {isLoggedIn ? (
            <>
              <div className="font-semibold cursor-default">{name}</div>
              <UserAvatarDropdown/>
            </>
          ) : (
            <Link to="/plans">
              <Button title="Registrarse" onClick={() => {}} size="small" />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
