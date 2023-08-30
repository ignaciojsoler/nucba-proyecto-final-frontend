import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import provincesData from "../data/provinces.json";
import { Service, User } from "../interfaces/interfaces";
import {
  createNewService,
  deleteService,
  getServiceById,
  getUserById,
  updateService,
} from "../services/services";
import { Loader } from "../components/Loader";
import Input from "../components/Input";
import { Button } from "../components/Button";
import SelectInput from "../components/SeletInput";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { AxiosResponse } from "axios";
import { validateInput } from "../helpers/inputValidators";
import Modal from "../components/Modal";
import categoriesData from "../data/categories.json";
import { isExpired, decodeToken } from "react-jwt";

const categories = categoriesData.categorias.map((categoria) => ({
  value: categoria.name,
  label: categoria.name,
}));

const provinces = provincesData.provincias.map((province) => ({
  value: province.nombre,
  label: province.nombre,
}));

const sortedProvinces = provinces
  .slice()
  .sort((a, b) => a.label.localeCompare(b.label));

const EditProfile = () => {

  const navigate = useNavigate();

  const token = useSelector((state: RootState) => state.token);
  const storageUser = useSelector((state: RootState) => state.user);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User>(storageUser);
  const [userDecodedToken, setUserDecodedToken] = useState<User | null>(null);
  const [displayModal, setDisplayModal] = useState<boolean>(false);

  const getUserDecodedToken = async () => {
    if (!token.token) return;
    if (isExpired(token.token)) return;
    const decodedToken = decodeToken<User>(token.token);
    if (!decodedToken) return;
    setUserDecodedToken(decodedToken);
  }

  const handleGetUserById = async () => {
    if (!userDecodedToken) return;
    const userData: AxiosResponse = await getUserById(userDecodedToken?.id);
    setIsLoading(false);
    if (!userData)
      return console.log("Algo ha salido mal, intentalo de nuevo más tarde");
    if (userData.status !== 200) {
      return console.log(userData.data);
    }
    setUser(userData.data.userData);
  };

  const handleSubmit = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();

    setIsLoading(true);
    console.log(user)
    setIsLoading(false);
    return alert("Debes ingresar a una sesión para hacer esto.");
  };

  useEffect(() => {
    getUserDecodedToken();
  }, []);
  
  useEffect(() => {
    if (userDecodedToken) {
      handleGetUserById();
    }
    console.log(user)
  }, [userDecodedToken]);

  return (
    <div className="m-auto w-full h-screen flex flex-col justify-center items-center bg-cover animate-sladeInFromBottomMedium">
      {isLoading && <Loader />}
      <div className="p-8 space-y-4 rounded-xl w-full max-w-xl">
        <form className="space-y-4" onSubmit={(e) => handleSubmit(e)}>
          <h3 className=" text-center text-3xl font-bold mb-4">Tus datos</h3>
          <Input
            placeholder="Nombre completo"
            onChangeText={(e) => setUser(prevUser => ({...prevUser, name: e}))}
            value={user?.name}
            validations={["notEmpty", "minLength:12", "maxLength:60"]}
          />
          <Input
            placeholder="Correo electrónico"
            onChangeText={() => {}}
            value={user?.email || ""}
            validations={["notEmpty", "minLength:12", "maxLength:60"]}
            disabled
          />
          <SelectInput
            onChange={(e) => setUser(prevUser => ({...prevUser, city: e}))}
            options={sortedProvinces}
            placeholder="Selecciona una ubicación"
            value={user?.city || ""}
          />
          <Input
            placeholder="Teléfono"
            onChangeText={(e) => setUser(prevUser => ({...prevUser, phone: e}))}
            value={user?.phone || ""}
            validations={["notEmpty", "minLength:12", "maxLength:60"]}
          />
          <SelectInput
            onChange={(e) => setUser(prevUser => ({...prevUser, occupation: e}))}
            options={categories}
            placeholder="Selecciona una ocupación"
            value={user?.occupation || ""}
          />
          <Input
            onChangeText={(e) => setUser(prevUser => ({...prevUser, bio: e}))}
            placeholder="Acerca de tí"
            value={user?.occupation || ""}
            type="textarea"
            rows={3}
          />
          <Button
            title="Actualizar"
            className="w-full"
            onClick={() => {}}
          />
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
