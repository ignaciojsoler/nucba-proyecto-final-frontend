import { callUserPhone } from "../helpers/callUserPhone";
import { Service, User } from "../interfaces/interfaces";
import { AiOutlineHeart } from "react-icons/ai";
import { Button } from "./Button";
import { useState, useEffect } from "react";
import { isExpired, decodeToken } from "react-jwt";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { AxiosResponse } from "axios";
import {
  removeServiceFromFavorites,
  saveServiceAsFavorite,
} from "../services/services";
import {
  addFavoriteService,
  removeFavoriteService,
} from "../store/favoritesSlice";
import { useNavigate } from "react-router-dom";
interface ServiceDetailProps {
  service: Service;
}

const ServiceDetail = ({ service }: ServiceDetailProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state: RootState) => state.token.token);
  const favorites = useSelector((state: RootState) => state.favorites);

  const [isSavedAsFavorite, setIsSavedAsFavorite] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userDecodedToken, setUserDecodedToken] = useState<User | null>(null);

  const getUserDecodedToken = async () => {
    if (!token) return;
    if (isExpired(token)) return;
    const decodedToken = decodeToken<User>(token);
    if (!decodedToken) return;
    setUserDecodedToken(decodedToken);
  };

  const handleSetAsFavorite = async () => {
    if (!isSavedAsFavorite) {
      try {
        if (!token || !userDecodedToken?.id || !service.id) return null;
        setIsLoading(true);
        const savedAsFavorite: AxiosResponse = await saveServiceAsFavorite(
          token,
          userDecodedToken?.id,
          service.id
        );
        setIsLoading(false);
        if (!savedAsFavorite || savedAsFavorite.status !== 200) return null;
        dispatch(addFavoriteService(savedAsFavorite.data.result));
        setIsSavedAsFavorite(true);
      } catch (error) {
        console.log(error);
      }
    } else if (isSavedAsFavorite) {
      try {
        if (!token || !userDecodedToken?.id || !service.id) return null;
        const favoriteService = favorites.favoritesServices.find(
          (item) =>
            item.userId === userDecodedToken?.id &&
            item.serviceId === service.id
        );
        if (!favoriteService || favoriteService === undefined) return null;
        setIsLoading(true);
        const removedFromFavorites: AxiosResponse =
          await removeServiceFromFavorites(favoriteService.id, token);
        setIsLoading(false);
        if (!removedFromFavorites || removedFromFavorites.status !== 200)
          return null;
        dispatch(removeFavoriteService(removedFromFavorites.data.result.id));
        setIsSavedAsFavorite(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const isServiceSavedAsFavorite = () => {
    if (!Array.isArray(favorites.favoritesServices)) return;
    const savedAsFavoriteService = favorites.favoritesServices.find(
      (s) => s.serviceId === service.id
    );
    if (!savedAsFavoriteService || savedAsFavoriteService === undefined) return;
    setIsSavedAsFavorite(true);
  };

  useEffect(() => {
    isServiceSavedAsFavorite();
  });

  useEffect(() => {
    getUserDecodedToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <article className="w-full space-y-4 animate-sladeInFromBottomShort">
      <h2 className="text-5xl font-semibold" style={{
        lineHeight: "3.8rem"
      }}>{service.title}</h2>
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
        {userDecodedToken && userDecodedToken.id === service.userId ? (
          <Button
            title="Editar"
            onClick={() => navigate(`../service/edit/${service.id}`)}
            size="large"
          />
        ) : (
          <>
            <Button
              title="Contratar ahora"
              onClick={() => callUserPhone(service.worker.phone)}
              size="large"
            />
            <Button
              title={
                isLoading
                  ? "Cargando..."
                  : isSavedAsFavorite
                  ? "Quitar de favoritos"
                  : "Guardar en favoritos"
              }
              color={isSavedAsFavorite ? "dark" : "neutral"}
              icon={<AiOutlineHeart />}
              onClick={() => handleSetAsFavorite()}
              size="large"
              className="lg:w-80"
            />
          </>
        )}
      </div>
    </article>
  );
};

export default ServiceDetail;
