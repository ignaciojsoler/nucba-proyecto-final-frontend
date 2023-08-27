import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Service } from "../interfaces/interfaces";
import { getServiceById } from "../services/services";
import ProfileCard from "../components/ProfileCard";
import ServiceDetail from "../components/ServiceDetail";
import ProfileCardSkeleton from "../components/Skeletons/ProfileCardSkeleton";
import ServiceDetailSkeleton from "../components/Skeletons/ServiceDetailSkeleton";

const ServicePage = () => {
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

  return (
    <>
      <section className="min-h-screen max-w-7xl m-auto px-6 pb-12">
        <div className="pt-28 h-full w-full flex flex-col items-start lg:flex-row gap-8">
          {isLoading || !service ? (
            <>
            <ServiceDetailSkeleton/>
            <ProfileCardSkeleton/></>
          ) : (
            <>
              <ServiceDetail service={service} />
              <ProfileCard
                worker={service.worker}
                className="animate-sladeInFromBottomMedium"
                buttonFunction="visitProfile"
              />
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default ServicePage;
