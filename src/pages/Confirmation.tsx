import { useEffect, useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { getFromStorage } from "../helpers/handleStorage";

const Confirmation = () => {
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    const storageEmail: string = getFromStorage("userEmail");
    console.log(storageEmail)
    if (!storageEmail) return;
    setUserEmail(storageEmail);

  }, []);

  return (
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
            Se ha enviado un enlace de verificación a su correo electrónico <b>{userEmail}</b><br/>
            Verifique su bandeja de entrada, y en caso de no encontrar el
            mensaje de confirmación, por favor, revise también su bandeja de
            spam, ya que es posible que el mensaje se encuentre allí.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
