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

export const SignUp = () => {
  const [username, setUsername] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  const getSelectedPlanFromStorage = () => {
    const storagePlan: { value: string } = getFromStorage('selectedPlan');
    if (!storagePlan) return null;
    setSelectedPlan(storagePlan.value);
}

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
  };

  useEffect(() => {
    getSelectedPlanFromStorage();
  }, []);
  
  return (
    <div className="m-auto max-w-xl h-screen flex flex-col justify-center items-center">
      {isLoading && <Loader />}
      <div className="p-8 space-y-4 rounded-xl min-w-full">
        <h4 className="text-slate-200 text-center text-2xl font-bold">
          Crea una cuenta nueva de {selectedPlan}
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
        <div className="flex-row justify-center py-2">
          <p className="text-slate-200 text-center text-sm py-2">
            ¿Ya estás registrado?
            <span className="text-emerald-600 font-bold ml-2">
              <Link to="/login">Inicia sesión</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
