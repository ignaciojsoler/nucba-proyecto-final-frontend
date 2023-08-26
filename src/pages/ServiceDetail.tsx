import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Service } from "../interfaces/interfaces";
import { getServiceById } from "../services/services";
import { Loader } from "../components/Loader";
import ProfileCard from "../components/ProfileCard";
import { Button } from "../components/Button";
import { callUserPhone } from "../helpers/callUserPhone";
import {
  AiOutlineHeart,
} from "react-icons/ai";
const ServiceDetail = () => {
  const { pathname } = useLocation();
  const serviceId = pathname.substring(pathname.lastIndexOf("/") + 1);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [service, setService] = useState<Service | null>(null);

  const handleGetServiceById = async () => {
    const serviceData = await getServiceById(serviceId);
    setIsLoading(false);
    if (!serviceData)
      return alert("Algo ha salido mal, intentalo de nuevo más tarde");
    if (serviceData.status !== 200) {
      return alert(serviceData.data.msg);
    }
    setService(serviceData.data);
  };

  useEffect(() => {
    handleGetServiceById();
  }, []);

  if (!service) return null;
  console.log(service);
  return (
    <>
      {isLoading && <Loader />}
      <section className="min-h-screen max-w-7xl m-auto px-6 pb-12">
        <div className="pt-28 h-full w-full flex flex-col items-start lg:flex-row gap-8">
          <article className="w-full space-y-4 animate-sladeInFromBottomShort">
            <h2 className=" text-6xl font-semibold">{service.title}</h2>
            <h5 className=" text-2xl text-slate-400 font-normal">
              {service.description}
            </h5>
            <h3 className=" text-3xl font-extrabold text-emerald-600">
              ${service.hourlyRate}/h
            </h3>
            <h5 className=" text-lg font-normal">
              Ofrecido por {service.worker.name}
            </h5>
            <div className="py-4 flex flex-col gap-y-8 gap-x-4 lg:flex-row">
              <Button
                title="Contratar ahora"
                onClick={() => callUserPhone(service.worker.phone)}
                size="large"
              />
              <Button
                title="Guardar en favoritos"
                color="dark"
                icon={<AiOutlineHeart/>}
                onClick={() => callUserPhone(service.worker.phone)}
                size="large"
              />
            </div>
          </article>
          {service.worker && (
            <ProfileCard
              worker={service.worker}
              className="animate-sladeInFromBottomMedium"
              buttonFunction="visitProfile"
            />
          )}
        </div>
      </section>
    </>
  );
};

export default ServiceDetail;
