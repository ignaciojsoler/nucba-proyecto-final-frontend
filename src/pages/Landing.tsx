import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import bgLandingMobile from "../assets/img/bg-landing-mobile.jpg";
import bgLandingDesktop from "../assets/img/bg-landing-desktop.jpg";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <main className="m-auto w-full h-screen flex flex-col justify-center items-center">
      <section className="p-8 space-y-8 rounded-xl w-full z-10 pt-36 md:max-w-2xl lg:max-w-7xl md:pt-0">
        <div className="space-y-6 md:max-w-2xl lg:max-w-2xl"> 
          <h1 className=" text-5xl font-bold md:text-8xl animate-sladeInFromBottomShort">
            Bienvenido a <span className=" text-emerald-600">ServiHogar</span>
          </h1>
          <p className="text-xl md:text-2xl leading-8 animate-sladeInFromBottomMedium">
            ServiHogar es la plataforma perfecta para conectar a clientes como
            tú con los trabajadores más talentosos y confiables para satisfacer
            todas tus necesidades domésticas.
          </p>
        </div>
        <Button
          onClick={() => {
            navigate("/plans");
          }}
          title="Empezar ahora"
          className="w-full lg:w-auto animate-sladeInFromBottomLong"
          size="large"
        />
      </section>
      <div className="absolute m-auto top-0 max-h-screen overflow-hidden">
        <img
          src={bgLandingMobile}
          alt="workers image"
          className=" md:hidden min-h-screen object-cover"
        />
        <img
          src={bgLandingDesktop}
          alt="workers "
          className="hidden md:block min-h-screen object-cover animate-blurTransition"
        />
      </div>
    </main>
  );
};

export default Landing;
