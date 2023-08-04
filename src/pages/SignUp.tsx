import { useState, useEffect } from "react";

import Input from "../components/Input";
import { validateInput } from "../helpers/inputValidators";
import { AxiosResponse } from "axios";
import { signUp } from "../services/services";
import { Button } from "../components/Button";
import { Loader } from "../components/Loader";
import { Link } from "react-router-dom";
import { getFromStorage } from "../helpers/handleStorage";
// import { signUp } from "../../services/services";
import provincesData from "../data/provinces.json";
import {FaChevronRight} from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const sortedProvinces = provincesData.provincias.sort((a, b) =>
    a.nombre.localeCompare(b.nombre)
  );
  
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const getSelectedPlanFromStorage = () => {
    const storagePlan: { value: string } = getFromStorage("selectedPlan");
    if (!storagePlan) return null;
    setSelectedPlan(storagePlan.value);
  };

  const handleSignUp = async () => {
    const [usernameErrors] = validateInput(userEmail, ["notEmpty", "isEmail"]);
    const [emailErrors] = validateInput(userEmail, ["notEmpty", "isEmail"]);
    const [passwordErrors] = validateInput(userPassword, [
      "notEmpty",
      "validPassword",
    ]);

    if (
      usernameErrors.length > 0 ||
      emailErrors.length > 0 ||
      passwordErrors.length > 0
    ) {
      alert(
        "¡Ups! Alguno de los campos ingresados es incorrecto. Por favor, revisa los campos y vuelve a intentarlo."
      );
      return;
    }

    setIsLoading(true);
    console.log(username)
    const loginResponse: AxiosResponse = await signUp(
      username,
      userEmail,
      userPassword
    );

    setIsLoading(false);

    if (!loginResponse)
      return alert("Algo ha salido mal, intentalo de nuevo más tarde");

    if (loginResponse.status !== 200) return alert(loginResponse.data.msg);

    alert("¡Felicidades, tu registro se ha completado exitosamente!");

    return navigate('/dashboard');
  };

  useEffect(() => {
    getSelectedPlanFromStorage();
  }, []);

  return (
    <div className="h-full bg-signup-img bg-cover">
      <div className="m-auto max-w-7xl min-h-screen flex flex-col justify-center items-center px-6 lg:flex-row lg:h-screen lg:space-x-8">
      {isLoading && <Loader />}
      <div className="hidden w-full lg:flex lg:flex-col lg:h-full lg:py-28">
        <div className="h-full bg-slate-800 bg-opacity-40 backdrop-blur-lg rounded-2xl p-12 flex flex-col justify-center items-start space-y-8 text-slate-200  animate-sladeInFromBottomShort">
          <h3 className=" text-5xl font-bold">
            <span className=" text-purple-700">Únete</span> a nuestra comunidad hoy.
          </h3>
          <p className=" text-base font-medium text-slate-400">
            Nuestro proceso de registro es rápido y sencillo. Te tomará tan solo
            unos minutos.
          </p>
          <Button
            disabled
            onClick={() => {}}
            color="light"
          ><p className="font-bold flex items-center justify-between"><span className="mr-3"><FaChevronRight/></span> Comienza ahora</p></Button>
        </div>
      </div>
      <div className="w-full lg:flex lg:items-center">
        <div className="min-h-full hidden lg:block "></div>
        <div className="pt-24 space-y-4 rounded-xl min-w-full lg:pt-0 animate-sladeInFromBottomMedium">
          <h4 className="text-slate-200 text-center text-2xl font-bold mb-6">
            Registrarse como {selectedPlan}
          </h4>
          <Input
            placeholder="Nombre completo"
            onChangeText={setUsername}
            value={username}
            validations={["notEmpty", "minLength:8", "maxLength:50"]}
          />
          <Input
            placeholder="Correo electrónico"
            onChangeText={setUserEmail}
            value={userEmail}
            validations={["notEmpty", "isEmail"]}
          />
          <Input
            placeholder="Contraseña"
            onChangeText={setUserPassword}
            value={userPassword}
            validations={["notEmpty", "validPassword"]}
            secureTextEntry={true}
          />
          <Input
            placeholder="Confirmar contraseña"
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            validations={["notEmpty", `checkPassword:${userPassword}`]}
            secureTextEntry={true}
          />
          <Button
            title="Registrarme"
            onClick={() => handleSignUp()}
            className="w-full"
          />
          <div className="flex-row justify-center py-1">
            <p className="text-slate-200 text-center text-sm py-2">
              ¿Ya estás registrado?
              <span className="text-emerald-600 font-bold ml-2">
                <Link to="/login">Inicia sesión</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};
