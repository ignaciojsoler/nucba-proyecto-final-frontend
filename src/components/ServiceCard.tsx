import { useEffect, useState } from "react";
import { Service, User } from "../interfaces/interfaces";
import { AiFillHeart, AiOutlineHeart, AiOutlineEdit } from "react-icons/ai";
import { categoriesAttributes } from "../helpers/categoriesAttributes";
import { useNavigate } from "react-router-dom";
import {
  removeServiceFromFavorites,
  saveServiceAsFavorite,
} from "../services/services";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../store/store";
import { useDispatch } from "react-redux";
import { AxiosResponse } from "axios";
import {
  addFavoriteService,
  removeFavoriteService,
} from "../store/favoritesSlice";
import Spinner from "./Spinner";
import { isExpired, decodeToken } from "react-jwt";

interface ServiceCardProps {
  service: Service;
  user?: User;
  userId?: string;
}

const ServiceCard = ({ service, userId, user }: ServiceCardProps) => {
  const { id, title, description, hourlyRate, worker } = service;
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.token.token);
  const storageUserId = useSelector((state: RootState) => state.user.id);
  const favorites = useSelector((state: RootState) => state.favorites);

  const dispatch = useDispatch();

  const [isSavedAsFavorite, setIsSavedAsFavorite] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [redirect, setRedirect] = useState<boolean>(false);
  const [userDecodedToken, setUserDecodedToken] = useState<User | null>(null);

  const serviceCategoryAttributes = categoriesAttributes.find(
    (c) => c.name === service.category
  );

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
        if (!token || !storageUserId || !id) return null;
        setIsLoading(true);
        const savedAsFavorite: AxiosResponse = await saveServiceAsFavorite(
          token,
          storageUserId,
          id
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
        if (!token || !storageUserId || !id) return null;
        const favoriteService = favorites.favoritesServices.find(
          (service) =>
            service.userId === storageUserId && service.serviceId === id
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
    getUserDecodedToken();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (redirect) {
      return userId && userId === service.userId
        ? navigate(`../service/edit/${service.id}`)
        : navigate(`../service/${service.id}`);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redirect]);

  useEffect(() => {
    isServiceSavedAsFavorite();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favorites]);

  return (
    <div
      className="group rounded-lg overflow-hidden bg-slate-900 flex justify-between cursor-pointer transition duration-150 hover:bg-slate-800 animate-sladeInFromBottomShort"
      style={{ minHeight: "11.25rem" }}
      onClick={() => setRedirect(true)}
    >
      <div className="space-y-1 p-6">
        <h4 className="font-bold text-xl text line-clamp-1">{title}</h4>
        <span className="line-clamp-1">{worker?.name || user?.name}</span>
        <h5 className={`font-bold text-xl text-emerald-600 line-clamp-1`}>
          ${hourlyRate}/h
        </h5>
        <p className=" text-slate-400 line-clamp-2">{description}</p>
      </div>
      <div className="flex flex-col items-center justify-between">
        {isLoading ? (
          <div className="relative m-7 h-5 w-5">
            <Spinner />
          </div>
        ) : userId && userId === service.userId || userDecodedToken && userDecodedToken.id === service.userId ? (
          <div
            className="relative m-7 transition duration-150 hover:opacity-50"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`../service/edit/${service.id}`);
            }}
          >
            <AiOutlineEdit size={20} color={"rgb(5, 150, 105)"} />
          </div>
        ) : (
          <div
            className="relative m-7"
            onClick={(e) => {
              e.stopPropagation();
              handleSetAsFavorite();
            }}
          >
            {isSavedAsFavorite ? (
              <AiFillHeart size={20} color={"rgb(5, 150, 105)"} />
            ) : (
              <AiOutlineHeart size={20} color={"rgb(5, 150, 105)"} />
            )}
          </div>
        )}
        <div
          className="w-16 h-16 self-end rounded-tl-xl flex justify-center items-center transition duration-150 group-hover:opacity-80"
          style={{ backgroundColor: serviceCategoryAttributes?.color }}
        >
          <img
            className="object-cover drop-shadow-xl h-12 z-12"
            src={serviceCategoryAttributes?.img}
            alt="Service image"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
