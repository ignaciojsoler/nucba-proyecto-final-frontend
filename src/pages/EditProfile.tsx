import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { User } from "../interfaces/interfaces";
import { findUserAndUpdate, getUserById } from "../services/services";
import { Loader } from "../components/Loader";
import Input from "../components/Input";
import { Button } from "../components/Button";
import SelectInput from "../components/SeletInput";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { AxiosResponse } from "axios";
import { isExpired, decodeToken } from "react-jwt";
import Modal from "../components/Modal";
import { validateInput } from "../helpers/inputValidators";
import { occupationsList, rolesList, sortedProvincesList } from "../helpers/selectLists";

const EditProfile = () => {
  const navigate = useNavigate();

  const token = useSelector((state: RootState) => state.token.token);
  const storageUser = useSelector((state: RootState) => state.user);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User>(storageUser);
  const [userDecodedToken, setUserDecodedToken] = useState<User | null>(null);
  const [displayModal, setDisplayModal] = useState<boolean>(false);

  const getUserDecodedToken = async () => {
    if (!token) return;
    if (isExpired(token)) return;
    const decodedToken = decodeToken<User>(token);
    if (!decodedToken) return;
    setUserDecodedToken(decodedToken);
  };

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

    if (!user.phone || !user.bio) return;

    const [nameValidations] = validateInput(user?.name, [
      "notEmpty",
      "minLength:8",
      "maxLength:50",
    ]);

    const [emailValidations] = validateInput(user?.email, [
      "notEmpty",
      "isEmail",
    ]);

    const [phoneValidations] = validateInput(user?.phone, [
      "notEmpty",
      "isValidPhone",
    ]);

    const [bioValidations] = validateInput(user?.bio, [
      "notEmpty",
      "minLength:50",
      "maxLength:150",
    ]);

    if (
      nameValidations.length > 0 ||
      phoneValidations.length > 0 ||
      bioValidations.length > 0 ||
      emailValidations.length > 0 ||
      !user.city ||
      !user.occupation
    ) {
      alert(
        "¡Ups! Alguno de los campos ingresados es incorrecto. Por favor, revisa los campos y vuelve a intentarlo."
      );
      return;
    }
    setIsLoading(true);
    if (!token) return alert("Debes iniciar sesión para hacer esto.");
    const updatedUser: AxiosResponse = await findUserAndUpdate(token, user);
    setIsLoading(false);
    if (!updatedUser)
      return alert("Algo ha salido mal, intentalo de nuevo más tarde");
    if (updatedUser.status !== 200) {
      return alert(updatedUser.data);
    }
    setUser(updatedUser.data.user);
    setDisplayModal(true);
  };

  const handleConfirmAndNavigate = () => {
    setDisplayModal(false);
    navigate("../profile");
  };

  useEffect(() => {
    getUserDecodedToken();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userDecodedToken) {
      handleGetUserById();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDecodedToken]);

  return (
    <div className="m-auto w-full min-h-screen flex flex-col justify-center items-center bg-cover animate-sladeInFromBottomMedium lg:pt-20">
      {isLoading && <Loader />}
      <Modal
        display={displayModal}
        title="Perfil Actualizado"
        text="Tu perfil se ha actualizado correctamente."
        confirmText="Aceptar"
        handleConfirm={() => handleConfirmAndNavigate()}
        handleCloseModal={() => setDisplayModal(false)}
        displayCancelButton={false}
      />
      <div className="p-8 space-y-4 rounded-xl w-full max-w-xl">
        <form className="space-y-4" onSubmit={(e) => handleSubmit(e)}>
          <h3 className=" text-center text-3xl font-bold mb-4">Tus datos</h3>
          <Input
            placeholder="Nombre completo"
            onChangeText={(e) =>
              setUser((prevUser) => ({ ...prevUser, name: e }))
            }
            value={user?.name}
            validations={["notEmpty", "minLength:8", "maxLength:50"]}
          />
          <Input
            placeholder="Correo electrónico"
            onChangeText={() => {}}
            value={user?.email || ""}
            validations={["notEmpty", "isEmail"]}
            disabled
          />
          <SelectInput
            onChange={(e) => setUser((prevUser) => ({ ...prevUser, role: e }))}
            options={rolesList}
            placeholder="Selecciona un tipo de usuario"
            value={user?.role || ""}
          />
          <SelectInput
            onChange={(e) => setUser((prevUser) => ({ ...prevUser, city: e }))}
            options={sortedProvincesList}
            placeholder="Selecciona una ubicación"
            value={user?.city || ""}
          />
          <Input
            placeholder="Teléfono"
            onChangeText={(e) =>
              setUser((prevUser) => ({ ...prevUser, phone: e }))
            }
            value={user?.phone || ""}
            validations={["isValidPhone"]}
          />
          {
            user?.role === "WORKER" &&
            <SelectInput
            onChange={(e) =>
              setUser((prevUser) => ({ ...prevUser, occupation: e }))
            }
            options={occupationsList}
            placeholder="Selecciona una ocupación"
            value={user?.occupation || ""}
          />
          }
          {
            user?.role === "WORKER" &&
            <Input
            onChangeText={(e) =>
              setUser((prevUser) => ({ ...prevUser, bio: e }))
            }
            placeholder="Acerca de tí"
            value={user?.bio || ""}
            type="textarea"
            rows={3}
            validations={["minLength:50", "maxLength:150"]}
          />
          }
          <Button title="Actualizar" className="w-full" onClick={() => {}} />
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
