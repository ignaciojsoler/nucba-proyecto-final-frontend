// interface ServiceCardProps {
//   id: string;
//   title: string;
//   description: string;
//   hourlyRate: number;
//   category: string;
//   userId: string;
// }

import carpineteria from "../assets/img/services/carpinteria.png";
import cerrajeria from "../assets/img/services/cerrajeria.png";
import electricidad from "../assets/img/services/electricidad.png";
import gas from "../assets/img/services/gas.png";
import jardineria from "../assets/img/services/jardineria.png";
import limpieza from "../assets/img/services/limpieza.png";
import mudanzas from "../assets/img/services/mudanzas.png";
import plomeria from "../assets/img/services/plomeria.png";

const categoriesImages = [
  carpineteria,
  cerrajeria,
  electricidad,
  gas,
  jardineria,
  limpieza,
  mudanzas,
  plomeria,
];

const ServiceCard = () => {
  return (
    <div className="group rounded-lg overflow-hidden bg-slate-900 grid grid-cols-6 h-48">
      <div className="space-y-1 p-6 col-span-4">
        <h4 className="font-bold text-3xl ">Título</h4>
        <h5 className="font-bold text-xl text-emerald-600">$1000/h</h5>
        <p className=" text-slate-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, minima
          quo. Dolorum veniam accusantium pariatur
        </p>
      </div>
      <div className=" bg-gradient-to-b from-emerald-600 to-emerald-800 h-48 col-span-2 col-start-5 flex justify-center items-center">
        <img
          src={categoriesImages[6]}
          className="object-cover h-full"
          alt="category image"
        />
      </div>
    </div>
  );
};

export default ServiceCard;
