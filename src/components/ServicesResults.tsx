import { useState, useEffect } from "react";
import { Service } from "../interfaces/interfaces";
import { getServices } from "../services/services";
import WorkerCardSkeleton from "./Skeletons/WorkerCardSkeleton";
import ServiceCard from "./ServiceCard";

interface ServicesResultsProps {
  category: string | null;
}

const ServicesResults = ({ category }: ServicesResultsProps) => {
  const [services, setServices] = useState<Service[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleGetServices = async () => {
    const servicesData = await getServices({ category });
    if (!servicesData) return;
    setServices(servicesData.data);
    setIsLoading(false);
  };

  useEffect(() => {
    handleGetServices();
  }, [category]);

  return (
    <article className="w-full">
      <div className="flex flex-col gap-y-4">
        <h4 className=" text-2xl self-start">Servicios</h4>
        {isLoading || !services ? <WorkerCardSkeleton/> : <>
        {services.length ? services.map(s => <ServiceCard service={s}/>) : <p>No se han encontrado servicios para esta categoría</p>}
        </>}
      </div>
    </article>
  );
};

export default ServicesResults;
