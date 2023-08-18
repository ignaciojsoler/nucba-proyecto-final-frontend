import { Service } from "../interfaces/interfaces";

interface ServiceCardProps {
 service: Service
}

const ServiceCard = ({service}: ServiceCardProps) => {
  const {title, description,hourlyRate,worker} = service;
  return (
    <div className="group rounded-lg overflow-hidden bg-slate-900 grid grid-cols-6 cursor-pointer transition duration-150 hover:bg-slate-800">
      <div
        className={`relative h-full col-span-6 flex justify-center items-center lg:col-span-2 lg:order-last bg-opacity-80 transition duration-150 group-hover:bg-opacity-60`}
      >
        <img
          src=""
          className="object-cover drop-shadow-xl h-40 z-10"
          alt="service image"
        />
       <div className="absolute opacity-60 w-full h-full bg-gradient-to-b from-transparent to-slate-600"></div>
      </div>
      <div className="space-y-1 p-6 col-span-6 lg:col-span-4">
        <h4 className="font-bold text-3xl text line-clamp-1">{title}</h4>
        <span className="text-xs line-clamp-1">{worker.name}</span>
        <h5 className={`font-bold text-xl text-emerald-600 line-clamp-1`}>${hourlyRate}/h</h5>
        <p className=" text-slate-400 line-clamp-2">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ServiceCard;
