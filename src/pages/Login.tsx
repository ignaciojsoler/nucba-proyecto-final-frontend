import { useState, useEffect } from "react";
import Input from "../components/Input";
import { Button } from "../components/Button";
import { Loader } from "../components/Loader";
import logoIcon from "../assets/icons/logo.svg";
import { validateInput } from "../helpers/inputValidators";
import { loginWithEmailAndPassword } from "../services/services";
import { AxiosResponse } from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../store/userSlice";
import { updateToken } from "../store/authenticationTokenSlice";
import { useDispatch } from "react-redux";
import { tokenExists } from "../helpers/jwtUtils";
import loginBackground from "../assets/img/login-img.jpg";
import { saveOnStorage } from "../helpers/handleStorage";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isLoggedIn = () => {
    const token = tokenExists();
    if (!token) return;
    navigate("/home");
  };

  const handleSubmit = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
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

    setIsLoading(false);

    if (!loginResponse) {
      return alert("Algo ha salido mal, intentalo de nuevo más tarde");
    }

    if (loginResponse.status !== 200) {
      return alert(loginResponse.data.msg);
    }

    saveOnStorage("token", loginResponse.data.token);
    saveOnStorage("user", loginResponse.data.user);

    dispatch(updateUser(loginResponse.data.user));
    dispatch(updateToken(loginResponse.data.token));

    isLoggedIn();
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <div
      className="m-auto w-full min-h-screen flex flex-col justify-center items-center bg-cover animate-blurTransition"
      style={{
        backgroundImage: `url(${loginBackground})`,
      }}
    >
      {isLoading && <Loader />}
      <div className="p-8 pt-32 space-y-8 rounded-xl w-full max-w-xl animate-sladeInFromBottomMedium">
        <div className="space-y-4">
          <img
            src={logoIcon}
            alt="Logo icon"
            className="m-auto"
            loading="lazy"
          />
          <h3 className=" text-center text-4xl font-bold">ServiHogar</h3>
        </div>
        <form
          className="space-y-4 animate-sladeInFromBottomLong"
          onSubmit={(e) => handleSubmit(e)}
        >
          <h4 className=" text-center text-2xl font-bold mb-8">
            Ingresa a tu cuenta
          </h4>
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
            type="password"
          />
          <Button
            title="Iniciar sesión"
            className="w-full"
            onClick={() => {}}
          />
          <p className=" text-center text-sm py-2">
            ¿Aún no creaste tu cuenta?
            <span className="text-emerald-600 font-bold ml-2">
              <Link to="/plans">Registrate</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
