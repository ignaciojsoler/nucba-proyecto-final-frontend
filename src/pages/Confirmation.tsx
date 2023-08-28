import { useEffect, useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { getFromStorage } from "../helpers/handleStorage";
import Input from "../components/Input";
import { Loader } from "../components/Loader";
import { verifyAccount } from "../services/services";
import { AxiosResponse } from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { maxLength, minLength } from "../helpers/inputValidators";
import { Button } from "../components/Button";

const Confirmation = () => {
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState<string>("");
  const [userCode, setUserCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userIsVerified, setUserIsVerified] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!minLength(userCode, 6) && !maxLength(userCode, 6)) return null;
    setIsLoading(true);
    const verifiedUser: AxiosResponse = await verifyAccount(userEmail, userCode);
    setIsLoading(false);
    if (!verifiedUser || verifiedUser.status !== 200) {
      return alert(
        "Código de verificación inválido o expirado. Revisa tu correo nuevamente o intenta registrarte de nuevo."
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
          <form className="flex flex-col justify-center items-center bg-slate-800 bg-opacity-40 p-8 pb-12 space-y-4 rounded-xl animate-sladeInFromBottomShort lg:px-12">
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
          </form>
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
                Se ha enviado un código de verificación a su correo electrónico{" "}
                <b>{userEmail}</b>
                <br />
                Verifique su bandeja de entrada.{" "}
                <b>
                  Por favor, revise también su bandeja de spam, ya que es
                  posible que el mensaje se encuentre allí.
                </b>
              </p>
              <div className="pt-2 m-auto space-y-3">
                <Input
                  value={userCode}
                  onChangeText={(e) => setUserCode(e)}
                  placeholder="Ingresar código"
                  className=""
                />
                <Button
                  title="Confirmar"
                  onClick={() => handleSubmit()}
                  widthFull
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Confirmation;
