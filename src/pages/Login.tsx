import { useState } from "react";
import Input from "../components/Input";
import { Button } from "../components/Button";
import { Loader } from "../components/Loader";
import logoIcon from "../../public/icons/logo.svg";
import { validateInput } from "../helpers/inputValidators";

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

    // const loginResponse: AxiosResponse = await loginWithEmailAndPassword(
    //   userEmail,
    //   userPassword
    // );

    setTimeout(() => {
      
    setIsLoading(false);
    }, 5000)

    // if (!loginResponse)
    //   return alert("Algo ha salido mal, intentalo de nuevo más tarde");

    // if (loginResponse.status !== 200) return alert(loginResponse.data.msg);

    // const userData = JSON.stringify(loginResponse.data.user);

    // await SecureStore.setItemAsync('userData', userData);
    // await SecureStore.setItemAsync('userToken', loginResponse.data.token);

    // navigation.navigate('Home');
  };

  return (
    <div className="m-auto max-w-xl h-screen flex flex-col justify-center items-center">
      {isLoading && <Loader />}
      <div className="p-8 space-y-8 rounded-xl min-w-full">
        <div className="space-y-4">
          <img src={logoIcon} className="m-auto" />
          <p className="text-slate-200 text-center text-4xl font-bold">
            ServiHogar
          </p>
        </div>
        <div className="space-y-4">
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
            <span className="text-emerald-600 font-bold"> Registrate</span>
          </p>
        </div>
      </div>
    </div>
  );
};
