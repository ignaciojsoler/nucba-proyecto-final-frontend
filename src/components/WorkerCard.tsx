import { User } from "../interfaces/interfaces";
import defaultUserIcon from "../assets/icons/default-user.svg";
import { Link } from "react-router-dom";

interface WorkerCardProps {
  worker: User;
}

const WorkerCard = ({ worker }: WorkerCardProps) => {
  const { id, name, occupation, city, profileImage, bio } = worker;

  return (
    <Link
    to={`../worker/${id}`} 
    className="group rounded-lg overflow-hidden bg-slate-900 flex flex-col cursor-pointer animate-sladeInFromBottomShort transition duration-150 hover:bg-slate-800 lg:flex-row justify-between"
    >
      <div
        className={`relative h-full flex lg:order-last bg-opacity-80 transition duration-150 group-hover:bg-opacity-60`}
      >
        <img
          src={profileImage ?? defaultUserIcon}
          className={`drop-shadow-xl h-40 z-10 transition duration-150 ease-in m-auto ${!profileImage && "p-5"}`}
          alt="User image"
          loading="lazy"
        />
        <div className="absolute opacity-60 w-full h-ful"></div>
      </div>
      <div className="space-y-1 p-6">
        <h4 className="font-bold text-3xl line-clamp-1">{name}</h4>
        <span className="line-clamp-1">{city}</span>
        <h5 className={`font-bold text-xl text-emerald-600 line-clamp-1`}>{occupation}</h5>
        <p className=" text-slate-400 line-clamp-2">{bio}</p>
      </div>
    </Link>
  );
};

export default WorkerCard;
