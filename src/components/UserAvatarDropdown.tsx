import { useEffect, useRef, useState } from "react";
import defaultUserIcon from "../assets/icons/default-user.svg";
import { useNavigate } from "react-router-dom";
import { logOut } from "../helpers/logOut";

const UserAvatarDropdown = () => {
  const navigate = useNavigate();

  const [displayDropdownItems, setDisplayDropdownItems] =
    useState<boolean>(false);

  const dropdownOptions = [
    { onClick: () => navigate("/perfil"), text: "Perfil" },
    { onClick: () => logOut(navigate), text: "Cerrar sesión" },
  ];

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const closeDropdownOnOutsideClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setDisplayDropdownItems(false);
      }
    };

    document.addEventListener("click", closeDropdownOnOutsideClick);

    return () => {
      document.removeEventListener("click", closeDropdownOnOutsideClick);
    };
  }, []);

  return (
    <div
      className="relative w-9 cursor-pointer flex justify-end"
      onClick={() => setDisplayDropdownItems(!displayDropdownItems)}
      ref={containerRef}
    >
      <img src={defaultUserIcon} alt="User avatar" className="w-full h-full" />
      {displayDropdownItems && (
        <ul className="absolute text-end top-14 p-6 space-y-3 w-40 rounded-lg bg-slate-900 bg-opacity-80 backdrop-blur-2xl animate-sladeInFromBottomShort">
          {dropdownOptions.map((dropDownTiem) => {
            return (
              <li 
              className="block font-medium transition duration-150 hover:opacity-70"
              onClick={dropDownTiem.onClick}
              >
                {dropDownTiem.text}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default UserAvatarDropdown;
