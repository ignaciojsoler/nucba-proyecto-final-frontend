import { useEffect, useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { getFromStorage } from "../helpers/handleStorage";
import Input from "../components/Input";
import { isValidJWT } from "../helpers/jwtUtils";
import { Loader } from "../components/Loader";
import { verifyAccount } from "../services/services";
import { AxiosResponse } from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Confirmation = () => {

  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState<string>("");
  const [userToken, setUserToken] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userIsVerified, setUserIsVerified] = useState<boolean>(false);

  const handleToken = async (inputToken: string) => {
    setUserToken(inputToken);
  };

  const handlePaste = async (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedText = event.clipboardData.getData("text/plain");
    if (!isValidJWT(pastedText)) return console.log("mal");
    setIsLoading(true);
    const verifiedUser: AxiosResponse = await verifyAccount(pastedText);
    setIsLoading(false);
    if (!verifiedUser || verifiedUser.status !== 200) {
      return alert(
        "Token de verificación inválido o expirado. Revisa tu correo nuevamente o intenta registrarte de nuevo."
      );
    }
    setUserIsVerified(true);
  };

  useEffect(() => {
    const storageEmail: string = getFromStorage("userEmail");
    if (!storageEmail) navigate("/login");
    setUserEmail(storageEmail);
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <div className="m-auto min-h-screen py-28  px-6 max-w-7xl flex justify-center items-center">
        {userIsVerified ? (
          <div className="flex flex-col justify-center items-center bg-slate-800 bg-opacity-40 p-8 pb-12 space-y-4 rounded-xl animate-sladeInFromBottomShort lg:px-12">
            <div className="h-40 text-emerald-600 animate-sladeInFromBottomMedium">
              <MdOutlineEmail size={{ heigth: "full" }} />
            </div>
            <div className=" max-w-2xl space-y-3 animate-sladeInFromBottomLong flex flex-col">
              <h3 className=" font-bold text-3xl text-center">
                ¡Felicidades! Activaste tu cuenta exitosamente
              </h3>
              <p className="text-slate-400 text-center leading-8">
                Ya podes ingresar a tu cuenta :)
              </p>
              <Link to="/login" className="text-center">
                <h5 className="inline-block px-6 py-4 h-14 font-semibold transition-color duration-200 rounded-lg bg-emerald-600">
                  Iniciar sesión ahora{" "}
                </h5>
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center bg-slate-800 bg-opacity-40 p-8 pb-12 space-y-4 rounded-xl animate-sladeInFromBottomShort lg:px-12">
            <div className="h-40 text-emerald-600 animate-sladeInFromBottomMedium">
              <MdOutlineEmail size={{ heigth: "full" }} />
            </div>
            <div className=" max-w-2xl space-y-3 animate-sladeInFromBottomLong">
              <h3 className=" font-bold text-3xl text-center">
                ¡Felicidades! Te has registrado correctamente
              </h3>
              <p className="text-slate-400 text-center leading-8">
                Se ha enviado un tóken de verificación a su correo electrónico{" "}
                <b>{userEmail}</b>
                <br />
                Verifique su bandeja de entrada.{" "}
                <b>
                  Por favor, revise también su bandeja de spam, ya que es
                  posible que el mensaje se encuentre allí.
                </b>
              </p>
              <Input
                value={userToken}
                onChangeText={(e) => handleToken(e)}
                placeholder="Ingresar tóken"
                onChangePaste={(e) => handlePaste(e)}
                validations={["isValidJWT"]}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Confirmation;
