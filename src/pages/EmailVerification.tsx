import { useEffect, useState } from "react";
import { verifyAccount } from "../services/services";
import { Loader } from "../components/Loader";
import {HiOutlineEmojiSad} from 'react-icons/hi'

const EmailVerification = () => {
  const pathToken: string = decodeURIComponent(window.location.pathname.split("/")[2]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [succesConfirm, setSuccesConfirm] = useState(false);

  const verifyEmail = async () => {
    setIsLoading(true);
    const verifiedAccount = await verifyAccount(pathToken);
    if (!verifiedAccount || verifiedAccount.status !== 200)
      return setIsLoading(false);
    setIsLoading(true);
    setSuccesConfirm(true);
  };

  useEffect(() => {
    verifyEmail();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="m-auto min-h-screen py-28  px-6 max-w-7xl flex justify-center items-center">
      <div className="flex flex-col justify-center items-center bg-slate-800 bg-opacity-40 p-8 pb-12 space-y-4 rounded-xl animate-sladeInFromBottomShort lg:px-12">
        <div className="h-40 text-emerald-600 animate-sladeInFromBottomMedium">
          <HiOutlineEmojiSad size={{heigth: '40px'}}/>
        </div>
        <div className=" max-w-2xl space-y-3 animate-sladeInFromBottomLong">
        <h3 className=" font-bold text-3xl text-center">
        {succesConfirm
                ? "¡Felicidades!"
                : "¡Ups! Parece que algo ha salido mal"}
          </h3>
          <p className="text-slate-400 text-center leading-8">
          {succesConfirm
                ? "Tu correo electrónico ha sido confirmado exitosamente. Ya podés iniciar sesión."
                : "Es posible que tu validación haya expirado. Intenta registrarte nuevamente."}
          </p>
        </div>
      </div>
    </div>
        
      )}
    </>
  );
};

export default EmailVerification;
