import { Service } from "../interfaces/interfaces";
import plomeriaImg from "../assets/img/services/plomeria.png";
import electricidadImg from "../assets/img/services/electricidad.png";
import gasImg from "../assets/img/services/gas.png";
import cerrajeriaImg from "../assets/img/services/cerrajeria.png";
import limpiezaImg from "../assets/img/services/limpieza.png";
import jardineriaImg from "../assets/img/services/jardineria.png";
import mudanzasImg from "../assets/img/services/mudanzas.png";
import carpinteriaImg from "../assets/img/services/carpinteria.png";

interface ServiceCardProps {
  service: Service;
}

const categoriesAttributes = [
  {
    name: "Plomería",
    backgroundColor: "rgb(197, 215, 235)", // Light Blue
    img: plomeriaImg,
  },
  {
    name: "Electricidad",
    backgroundColor: "rgb(246, 211, 155)", // Light Orange
    img: electricidadImg,
  },
  {
    name: "Gas",
    backgroundColor: "rgb(189, 223, 191)", // Light Green
    img: gasImg,
  },
  {
    name: "Cerrajería",
    backgroundColor: "rgb(255, 191, 191)", // Light Red
    img: cerrajeriaImg,
  },
  {
    name: "Limpieza",
    backgroundColor: "rgb(216, 191, 216)", // Light Purple
    img: limpiezaImg,
  },
  {
    name: "Jardinería",
    backgroundColor: "rgb(194, 223, 200)", // Light Mint Green
    img: jardineriaImg,
  },
  {
    name: "Mudanzas",
    backgroundColor: "rgb(255, 226, 204)", // Light Peach
    img: mudanzasImg,
  },
  {
    name: "Carpintería",
    backgroundColor: "rgb(228, 196, 208)", // Light Pink
    img: carpinteriaImg,
  },
];

const ServiceCard = ({ service }: ServiceCardProps) => {
  const { title, description, hourlyRate, worker, category } = service;
  const serviceCategoryAttributes = categoriesAttributes.find(
    (c) => c.name === service.category
  );
  return (
    <div className="group rounded-lg overflow-hidden bg-slate-900 grid grid-cols-6 cursor-pointer transition duration-150 hover:bg-slate-800">
      <div
        className={`relative h-full col-span-6 flex justify-center items-center lg:col-span-2 lg:order-last bg-opacity-80 transition duration-150 opacity-90 group-hover:opacity-100`}
        style={{
          backgroundColor: serviceCategoryAttributes?.backgroundColor,
        }}
      >
        <h6 className="absolute top-4 left-4 text-xl font-semibold text-slate-800">{category}</h6>
        <img
          src={serviceCategoryAttributes?.img}
          className="absolute -bottom-5 -right-5 drop-shadow-xl h-40 z-10 transition ease-in duration-150 group-hover:scale-105"
          alt="service image"
        />
        <div className="absolute opacity-60 w-full h-full"></div>
      </div>
      <div className="space-y-1 p-6 col-span-6 lg:col-span-4">
        <h4 className="font-bold text-3xl text line-clamp-1">{title}</h4>
        <span className="text-xs line-clamp-1">{worker.name}</span>
        <h5 className={`font-bold text-xl text-emerald-600 line-clamp-1`}>
          ${hourlyRate}/h
        </h5>
        <p className=" text-slate-400 line-clamp-2">{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
