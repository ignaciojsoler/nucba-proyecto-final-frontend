import { useState } from "react";
import Input from "../components/Input";
import { Button } from "../components/Button";
import { Loader } from "../components/Loader";
import logoIcon from "../assets/icons/logo.svg";
import { validateInput } from "../helpers/inputValidators";
import { loginWithEmailAndPassword } from "../services/services";
import { AxiosResponse } from "axios";
import { Link } from "react-router-dom";

export const Login = () => {
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    const [emailErrors] = validateInput(userEmail, ["notEmpty", "isEmail"]);
    const [passwordErrors] = validateInput(userPassword, [
      "notEmpty",
      "validPassword",
    ]);

    if (emailErrors.length > 0 || passwordErrors.length > 0) {
      alert(
        "¡Ups! Alguno de los campos ingresados es incorrecto. Por favor, revisa los campos y vuelve a intentarlo."
      );
      return;
    }

    setIsLoading(true);

    const loginResponse: AxiosResponse = await loginWithEmailAndPassword(
      userEmail,
      userPassword
    );

    if (!loginResponse) {
      setIsLoading(false);
      return alert("Algo ha salido mal, intentalo de nuevo más tarde");
    }

    if (loginResponse.status !== 200) {
      setIsLoading(false);
      return alert(loginResponse.data.msg);
    }

    setIsLoading(false);
  };

  return (
    <div className="m-auto w-full h-screen flex flex-col justify-center items-center bg-login-img bg-cover">
      {isLoading && <Loader />}
      <div className="p-8 space-y-8 rounded-xl w-full max-w-xl animate-sladeInFromBottomShort">
        <div className="space-y-4">
          <img src={logoIcon} className="m-auto" />
          <h3 className="text-slate-200 text-center text-4xl font-bold">
            ServiHogar
          </h3>
        </div>
        <div className="space-y-4">
          <h4 className="text-slate-200 text-center text-2xl font-bold mb-8">Ingresa a tu cuenta</h4>
          <Input
            placeholder="Correo electrónico"
            onChangeText={(e) => setUserEmail(e)}
            value={userEmail}
            validations={["notEmpty", "isEmail", "maxLength:100"]}
          />
          <Input
            placeholder="Contraseña"
            onChangeText={(e) => setUserPassword(e)}
            value={userPassword}
            validations={["notEmpty", "validPassword"]}
            secureTextEntry={true}
          />
          <Button
            title="Iniciar sesión"
            onClick={handleSubmit}
            className="w-full"
          />
          <p className="text-slate-200 text-center text-sm py-2">
            ¿Aún no creaste tu cuenta?
            <span className="text-emerald-600 font-bold ml-2"><Link to='/plans'>Registrate</Link></span>
          </p>
        </div>
      </div>
    </div>
  );
};
