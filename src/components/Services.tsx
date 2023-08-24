import { Service } from "../interfaces/interfaces";
import { getServices } from "../services/services";
import ServiceCard from "./ServiceCard";
import { useEffect, useState } from "react";

const Services = () => {
  const [services, setServices] = useState<Service[] | null>(null);

  const handleGetServices = async () => {
    const servicesData = await getServices();
    if (!servicesData) return;
    setServices(servicesData.data);
    console.log(servicesData.data)
  };

  useEffect(() => {
    handleGetServices();
  }, []);

  if (!services) return null;

  return (
    <article className="w-full space-y-4 py-4 animate-sladeInFromBottomLarge">
      <h4 className=" text-2xl font-semibold self-start">Servicios</h4>
      <div className="grid grid-cols-1 gap-6 w-full md:p-0 md:grid-cols-2 lg:grid-cols-3">
        {services?.map((service) => {
          return <ServiceCard key={service.id} service={service} />;
        })}
      </div>
    </article>
  );
};

export default Services;
