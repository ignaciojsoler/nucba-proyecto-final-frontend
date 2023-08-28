import { User } from "../interfaces/interfaces";
import defaultUserIcon from "../assets/icons/default-user.svg";
import {
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineCalendar,
} from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { Button } from "./Button";
import { callUserPhone } from "../helpers/callUserPhone";
import { useNavigate } from "react-router-dom";

interface ProfileCardProps {
  worker: User;
  className?: string;
  buttonFunction?: "visitProfile" | "callUserPhone";
}

const ProfileCard = ({
  worker,
  className,
  buttonFunction = "callUserPhone",
}: ProfileCardProps) => {
  const { name, email, bio, city, occupation, profileImage, phone, createdAt } =
    worker;
  const createdAtDate = createdAt ? new Date(createdAt) : null;

  const navigate = useNavigate();

  return (
    <div
      className={`bg-slate-900 w-full lg:w-[36rem] rounded-lg px-6 ${className}`}
    >
      <div
        className={`relative h-full col-span-6 flex justify-center items-center bg-opacity-80 transition duration-150 group-hover:bg-opacity-60`}
      >
        <img
          src={profileImage ?? defaultUserIcon}
          className={`object-cover drop-shadow-xl h-40 z-10 transition duration-150 ease-in ${
            !profileImage && "p-5"
          }`}
          alt="User image"
          loading="lazy"
        />
      </div>
      <div className="py-6 divide-y space-y-3 divide-slate-400/20">
        <div className="space-y-1 pb-3">
          <h4 className="font-bold text-3xl line-clamp-1 text-center">
            {name}
          </h4>
          <h5
            className={`font-bold text-xl text-emerald-600 line-clamp-1 text-center`}
          >
            {occupation}
          </h5>
          <p className=" text-slate-400 line-clamp-2 text-center">{bio}</p>
        </div>
        <div className="pt-6 space-y-3">
          <div className="flex justify-between">
            <p className="text-slate-400 flex items-center">
              <span className="mr-2">
                <AiOutlineCalendar />
              </span>
              Miembro desde:
            </p>
            <p className="font-medium">
              {createdAtDate?.toLocaleString("es-ES", {
                year: "numeric",
                month: "long",
              })}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-slate-400 flex items-center">
              <span className="mr-2">
                <HiOutlineLocationMarker />
              </span>
              Ciudad:
            </p>
            <p className="font-medium">{city}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-slate-400 flex items-center">
              <span className="mr-2">
                <AiOutlinePhone />
              </span>
              Teléfono:
            </p>
            <p className="font-medium">{phone}</p>
          </div>
          <div className="flex justify-between flex-wrap overflow-auto">
            <p className="text-slate-400 flex items-center">
              <span className="mr-2">
                <AiOutlineMail />
              </span>
              Email:
            </p>
            <p className="text-end font-medium">{email}</p>
          </div>
          <div className="pt-6">
            <Button
              onClick={
                buttonFunction === "callUserPhone"
                  ? () => callUserPhone(worker.phone)
                  : () => navigate(`../worker/${worker.id}`)
              }
              widthFull
              title={
                buttonFunction === "callUserPhone" ? "Llamar" : "Visitar perfil"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
