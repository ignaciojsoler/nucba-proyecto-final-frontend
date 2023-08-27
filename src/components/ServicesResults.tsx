import { useState, useEffect } from "react";
import { Service } from "../interfaces/interfaces";
import { getServices } from "../services/services";
import WorkerCardSkeleton from "./Skeletons/WorkerCardSkeleton";

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
  }, []);

  return (
    <article className="w-full">
      <div className="flex flex-col">
        <h4 className=" text-2xl self-start">Servicios</h4>
        {isLoading || !services ? <WorkerCardSkeleton/> : "resultados"}
      </div>
    </article>
  );
};

export default ServicesResults;
