import { useEffect, useState } from "react";
import { Service } from "../interfaces/interfaces";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { categoriesAttributes } from "../helpers/categoriesAttributes";
import { useNavigate } from "react-router-dom";
import { saveServiceAsFavorite } from "../services/services";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../store/store";

interface ServiceCardProps {
  service: Service;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  const { id, title, description, hourlyRate, worker } = service;
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.token.token);
  const userId = useSelector((state: RootState) => state.user.id);

  const [isSavedAsFavorite, setIsSavedAsFavorite] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [redirect, setRedirect] = useState<boolean>(false);

  const serviceCategoryAttributes = categoriesAttributes.find(
    (c) => c.name === service.category
  );

  const handleSetAsFavorite = async () => {
    try {
      console.log("token", token)
      console.log("userId", userId)
      console.log("id", id)
      if (!token || !userId || !id) return null;
      setIsLoading(true);
      const savedAsFavorite = await saveServiceAsFavorite(token, userId, id);
      setIsLoading(false);
      if (!savedAsFavorite) return null;
      console.log(saveServiceAsFavorite)
      setIsSavedAsFavorite(!isSavedAsFavorite);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (redirect) {
      navigate(`../service/${service.id}`);
    }
  }, [redirect]);

  return (
    <div
      className="group rounded-lg overflow-hidden bg-slate-900 flex justify-between cursor-pointer transition duration-150 hover:bg-slate-800 animate-sladeInFromBottomShort"
      style={{ minHeight: "11.25rem" }}
      onClick={() => setRedirect(true)}
    >
      <div className="space-y-1 p-6">
        <h4 className="font-bold text-xl text line-clamp-1">{title}</h4>
        <span className="line-clamp-1">{worker.name ?? ""}</span>
        <h5 className={`font-bold text-xl text-emerald-600 line-clamp-1`}>
          ${hourlyRate}/h
        </h5>
        <p className=" text-slate-400 line-clamp-2">{description}</p>
      </div>
      <div className="flex flex-col items-center justify-between">
        {isLoading ? (
          "cargando..."
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
          className="w-16 h-16 self-end rounded-tl-xl flex justify-center items-center"
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
