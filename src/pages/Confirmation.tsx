import { useEffect, useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { getFromStorage } from "../helpers/handleStorage";
import Input from "../components/Input";
import { isValidJWT } from "../helpers/jwtUtils";
import { Loader } from "../components/Loader";
import { verifyAccount } from "../services/services";
import { AxiosResponse } from "axios";

const Confirmation = () => {
  const [userEmail, setUserEmail] = useState<string>("");
  const [userToken, setUserToken] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleTokenSubmit = async (inputToken: string) => {
    setUserToken(inputToken);
    if (!isValidJWT(userToken)) return; 
    console.log("formato valido")
  }

  const handlePaste = async (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedText = event.clipboardData.getData('text/plain');
    if (!isValidJWT(pastedText)) return;
    setIsLoading(true);
    const verifiedUser: AxiosResponse = await verifyAccount(pastedText);
    if (!verifiedUser || verifiedUser.status !== 200) return alert("Token de verificación inválido o expirado.");
    alert("¡Felicitaciones! Tu correo electrónico ha sido confirmado exitosamente. Ya podés iniciar sesión.")
  };

  useEffect(() => {
    const storageEmail: string = getFromStorage("userEmail");
    console.log(storageEmail);
    if (!storageEmail) return;
    setUserEmail(storageEmail);
  }, []);

  return (
    <>
    {isLoading && <Loader/>}
    <div className="m-auto min-h-screen py-28  px-6 max-w-7xl flex justify-center items-center">
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
            Verifique su bandeja de entrada, y en caso de no encontrar el
            mensaje de confirmación,{" "}
            <b>
              por favor, revise también su bandeja de spam, ya que es posible
              que el mensaje se encuentre allí.
            </b>
          </p>
          <Input
          value={userToken}
          onChangeText={(e) => handleTokenSubmit(e)}
          placeholder="Ingresar tóken"
          onChangePaste={(e) => handlePaste(e)}
          />
        </div>
      </div>
    </div>
    </>
  );
};

export default Confirmation;
