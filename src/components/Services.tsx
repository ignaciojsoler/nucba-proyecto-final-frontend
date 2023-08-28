import { Service } from "../interfaces/interfaces";
import { getServices, getUserFavoritesServices } from "../services/services";
import ServiceCard from "./ServiceCard";
import { useEffect, useState } from "react";
import ServiceCardSkeleton from "./Skeletons/ServiceCardSkeleton";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { setFavoritesServices } from "../store/favoritesSlice";
import { AxiosResponse } from "axios";
import { saveOnStorage } from "../helpers/handleStorage";

const Services = () => {
  const [services, setServices] = useState<Service[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const dispatch = useDispatch();

  const token = useSelector((state: RootState) => state.token.token);
  const userId = useSelector((state: RootState) => state.user.id);

  const handleGetFavoritesServices = async () => {
    if (!token || !userId) return null;
    const favoritesServices: AxiosResponse = await getUserFavoritesServices(token, userId);
    if (!favoritesServices || favoritesServices.status !== 200) return null;
    saveOnStorage("favoritesServices", favoritesServices.data);
    dispatch(setFavoritesServices(favoritesServices.data));
  }

  const handleGetServices = async () => {
    const servicesData: AxiosResponse = await getServices();
    if (!servicesData || servicesData.status !== 200) return;
    console.log(servicesData)
    setServices(servicesData.data);
    setIsLoading(false);
  };

  useEffect(() => {
    handleGetFavoritesServices();
    handleGetServices();
  }, []);

  return (
    <article className="w-full space-y-4 py-4 animate-sladeInFromBottomLarge">
      <div className="flex justify-between items-end">
        <h4 className=" text-2xl font-semibold self-start">Servicios</h4>
        <Link className=" font-semibold" to="/categories">
          Ver más
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-6 w-full md:p-0 md:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? Array.from({ length: 8 }, (_, index) => (
              <ServiceCardSkeleton key={index} />
            ))
          : services?.map((service) => {
              return <ServiceCard key={service.id} service={service} />;
            })}
      </div>
    </article>
  );
};

export default Services;
