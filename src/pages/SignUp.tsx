import { useState, useEffect } from "react";

import Input from "../components/Input";
import { validateInput } from "../helpers/inputValidators";
import { AxiosResponse } from "axios";
import { signUp } from "../services/services";
import { Button } from "../components/Button";
import { Loader } from "../components/Loader";
import { Link } from "react-router-dom";
import { getFromStorage, saveOnStorage } from "../helpers/handleStorage";
// import { signUp } from "../../services/services";
// import provincesData from "../data/provinces.json";
import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  // const sortedProvinces = provincesData.provincias.sort((a, b) =>
  //   a.nombre.localeCompare(b.nombre)
  // );

  const navigate = useNavigate();

  const [username, setUsername] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const getSelectedPlanFromStorage = () => {
    const storagePlan: string = getFromStorage("selectedPlan");
    if (!storagePlan) return null;
    setSelectedPlan(storagePlan);
  };

  const handleSignUp = async () => {
    const [usernameErrors] = validateInput(userEmail, ["notEmpty", "isEmail"]);
    const [emailErrors] = validateInput(userEmail, ["notEmpty", "isEmail"]);
    const [passwordErrors] = validateInput(userPassword, [
      "notEmpty",
      "validPassword",
    ]);

    if (userPassword !== confirmPassword)
      return alert("Las contraseñas ingresadas no coinciden");

    if (
      usernameErrors.length > 0 ||
      emailErrors.length > 0 ||
      passwordErrors.length > 0 ||
      !selectedPlan
    ) {
      alert(
        "¡Ups! Alguno de los campos ingresados es incorrecto. Por favor, revisa los campos y vuelve a intentarlo."
      );
      return;
    }

    const role =
      selectedPlan.toLocaleUpperCase() === "CLIENTE" ? "CLIENT" : "WORKER";
    console.log(role);

    setIsLoading(true);

    const loginResponse: AxiosResponse = await signUp(
      username,
      userEmail,
      userPassword,
      role
    );
    console.log(await loginResponse);
    setIsLoading(false);

    if (!loginResponse)
      return alert("Algo ha salido mal, intentalo de nuevo más tarde");

    if (loginResponse.status !== 200) return alert(loginResponse.data.msg);

    saveOnStorage("userEmail", userEmail);

    return navigate("/confirmation");
  };

  useEffect(() => {
    getSelectedPlanFromStorage();
  }, []);

  return (
    <>
      {isLoading && <Loader />}

      <div className="h-full bg-signup-img bg-cover">
        <div className="m-auto max-w-7xl min-h-screen flex flex-col justify-center items-center px-6 lg:flex-row lg:h-screen lg:space-x-8">
          <div className="hidden w-full lg:flex lg:flex-col lg:h-full lg:py-28">
            <div className="h-full bg-slate-800 bg-opacity-40 backdrop-blur-lg rounded-2xl p-12 flex flex-col justify-center items-start space-y-8   animate-sladeInFromBottomShort">
              <h3 className=" text-6xl font-bold">
                <span className=" text-purple-700">Unite</span> a nuestra
                comunidad hoy.
              </h3>
              <p className=" text-base font-medium text-slate-400">
                Nuestro proceso de registro es rápido y sencillo. Te tomará tan
                solo unos minutos.
              </p>
              <Button
                disabled
                onClick={() => {}}
                className=" bg-slate-700 hover:bg-slate-700"
              >
                <p className="font-bold flex items-center justify-between">
                  <span className="mr-3">
                    <FaChevronRight />
                  </span>{" "}
                  Comienza ahora
                </p>
              </Button>
            </div>
          </div>
          <div className="w-full lg:flex lg:items-center">
            <div className="min-h-full hidden lg:block "></div>
            <div className="pt-28 space-y-4 rounded-xl min-w-full lg:pt-0 animate-sladeInFromBottomMedium">
              <h4 className="text-center text-2xl font-bold mb-6">
                Registrarse como{" "}
                <span
                  className={`${
                    selectedPlan === "cliente"
                      ? "text-purple-700"
                      : "text-emerald-600"
                  }`}
                >
                  {selectedPlan}
                </span>
                <Link to="/plans"><span className="text-base transitiion duration-150 font-medium hover:text-slate-300 ml-1">{" "}(cambiar)</span></Link>
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
                type="password"
              />
              <Input
                placeholder="Confirmar contraseña"
                onChangeText={setConfirmPassword}
                value={confirmPassword}
                validations={["notEmpty", `checkPassword:${userPassword}`]}
                type="password"
              />
              <Button
                title="Registrarme"
                onClick={() => handleSignUp()}
                className="w-full"
              />
              <div className="flex-row justify-center py-1">
                <p className=" text-center text-sm py-2">
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
    </>
  );
};

export default SignUp;
