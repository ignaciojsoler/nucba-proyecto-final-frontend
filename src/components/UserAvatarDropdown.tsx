import { useEffect, useRef, useState } from "react";
import defaultUserIcon from "../assets/icons/default-user.svg";
import { useNavigate } from "react-router-dom";
import { logOut } from "../helpers/logOut";
import { getFromStorage } from "../helpers/handleStorage";

interface UserAvatarDropdownProps {
  isLoggedIn: boolean;
}

const UserAvatarDropdown = ({isLoggedIn}: UserAvatarDropdownProps) => {
  const navigate = useNavigate();

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [displayDropdownItems, setDisplayDropdownItems] =
    useState<boolean>(false);

  const dropdownOptions = [
    { onClick: () => navigate("/profile"), text: "Perfil" },
    { onClick: () => logOut(navigate), text: "Cerrar sesión" },
  ];

  const containerRef = useRef<HTMLDivElement | null>(null);

  const getImageFromStorage = async () => {
    const image = await getFromStorage("profileImage");
    console.log(image)
    if (image) setProfileImage(image);
  }

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

  useEffect(() => {
    getImageFromStorage();
  }, [isLoggedIn]);

  return (
    <div
      className="relative w-9 cursor-pointer flex justify-end"
      onClick={() => setDisplayDropdownItems(!displayDropdownItems)}
      ref={containerRef}
    >
      <img src={profileImage ?? defaultUserIcon} alt="User avatar" className="w-9 h-9 rounded-full overflow-hidden object-cover" />
      {displayDropdownItems && (
        <ul className="absolute text-end top-14 p-6 space-y-3 w-40 rounded-lg bg-slate-900 bg-opacity-80 backdrop-blur-xl shadow-2xl animate-sladeInFromBottomShort">
          {dropdownOptions.map((dropDownTiem, idx) => {
            return (
              <li 
              className="block font-medium transition duration-150 hover:opacity-70"
              onClick={dropDownTiem.onClick}
              key={idx}
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
