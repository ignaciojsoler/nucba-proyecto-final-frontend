import { useState } from "react";
import { Service } from "../interfaces/interfaces";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import plomeriaImg from "../assets/img/services/plomeria.png";
import electricidadImg from "../assets/img/services/electricidad.png";
import gasImg from "../assets/img/services/gas.png";
import cerrajeriaImg from "../assets/img/services/cerrajeria.png";
import limpiezaImg from "../assets/img/services/limpieza.png";
import jardineriaImg from "../assets/img/services/jardineria.png";
import mudanzasImg from "../assets/img/services/mudanzas.png";
import carpinteriaImg from "../assets/img/services/carpinteria.png";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  service: Service;
}

const categoriesAttributes = [
  {
    name: "Plomería",
    color: "rgb(197, 215, 235)", // Light Blue
    img: plomeriaImg,
  },
  {
    name: "Electricidad",
    color: "rgb(246, 211, 155)", // Light Orange
    img: electricidadImg,
  },
  {
    name: "Gas",
    color: "rgb(189, 223, 191)", // Light Green
    img: gasImg,
  },
  {
    name: "Cerrajería",
    color: "rgb(255, 191, 191)", // Light Red
    img: cerrajeriaImg,
  },
  {
    name: "Limpieza",
    color: "rgb(216, 191, 216)", // Light Purple
    img: limpiezaImg,
  },
  {
    name: "Jardinería",
    color: "rgb(194, 223, 200)", // Light Mint Green
    img: jardineriaImg,
  },
  {
    name: "Mudanzas",
    color: "rgb(255, 226, 204)", // Light Peach
    img: mudanzasImg,
  },
  {
    name: "Carpintería",
    color: "rgb(228, 196, 208)", // Light Pink
    img: carpinteriaImg,
  },
];

const ServiceCard = ({ service }: ServiceCardProps) => {
  const { title, description, hourlyRate, worker } = service;

  const [isSavedAsFavorite, setIsSavedAsFavorite] = useState<boolean>(false);

  const serviceCategoryAttributes = categoriesAttributes.find(
    (c) => c.name === service.category
  );

  const handleSetAsFavorite = () => {
    setIsSavedAsFavorite(!isSavedAsFavorite);
  }

  return (
    <Link to={`../service/${service.id}`} className="group rounded-lg overflow-hidden bg-slate-900 grid grid-cols-6 cursor-pointer transition duration-150 hover:bg-slate-800 animate-sladeInFromBottomShort" style={{minHeight: "11.25rem"}}>
      <div className="space-y-1 p-6 col-span-5">
        <h4 className="font-bold text-xl text line-clamp-1">{title}</h4>
        <span className="text-xs line-clamp-1 font-semibold">
          {worker.name ?? ""}
        </span>
        <h5 className={`font-bold text-xl text-emerald-600 line-clamp-1`}>
          ${hourlyRate}/h
        </h5>
        <p className=" text-slate-400 line-clamp-2">{description}</p>
      </div>
      <div className="col-span-1 flex flex-col items-center justify-between">
        <div className="relative m-7 " onClick={() => handleSetAsFavorite()}>
          {isSavedAsFavorite ? (
            <AiFillHeart size={20} color={"rgb(5, 150, 105)"}/>
          ) : (
            <AiOutlineHeart size={20}  color={"rgb(5, 150, 105)"}/>
          )}
        </div>
        <div
          className="w-full h-16 self-end rounded-tl-xl flex justify-center items-center"
          style={{ backgroundColor: serviceCategoryAttributes?.color }}
        >
          <img
            className="object-cover drop-shadow-xl h-12 z-12"
            src={serviceCategoryAttributes?.img}
            alt="Service image"
            loading="lazy"
          />
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
