import { Button } from "../components/Button";
import { Navbar } from "../components/Header";

export const Landing = () => {
  return (
    <>
    <Navbar/>
    <div className="px-6 flex flex-col justify-center align-top pt-24 text-slate-200 md:px-8 lg:max-w-7xl m-auto lg:grid lg:grid-cols-2">
      <div className="fixed top-0 left-0 bg-hero-texture bg-cover mix-blend-multiply h-screen w-screen" />
      <div className=" space-y-8 pt-6 pb-12">
        <div className=" space-y-4">
          <h1 className=" text-5xl text-center font-bold">
            ¡Bienvenido a ServiHogar!
          </h1>
          <p className="text-justify leading-8">
            ¿Necesitas ayuda para arreglar algo en tu hogar? ¿Buscas a los
            mejores profesionales en plomería, electricidad, gasistas y más? ¡No
            busques más! ServiHogar es la plataforma perfecta para conectar a
            clientes como tú con los trabajadores más talentosos y confiables
            para satisfacer todas tus necesidades domésticas.
          </p>
        </div>
        <div className=" space-y-8">
          <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row md:justify-center md:items-start md:gap-4">
            <div className="w-full flex-grow backdrop-blur-lg bg-slate-400 bg-opacity-10 py-8 px-6 space-y-4 rounded-lg">
              <h6 className=" font-bold">Para Clientes</h6>
              <ul className=" text-sm space-y-4 list-disc pl-4">
                <li className="">Encuentra a los mejores profesionales</li>
                <li>Resuelve tus problemas.</li>
                <li>Confianza y tranquilidad.</li>
              </ul>
            </div>
            <div className="w-full flex-grow backdrop-blur-lg bg-slate-400 bg-opacity-10 py-8 px-6 space-y-4 rounded-lg">
              <h6 className=" font-bold">Para Trabajadores</h6>
              <ul className=" text-sm space-y-4 list-disc pl-4">
                <li className="">Amplía tu base de clientes.</li>
                <li>Decide cuándo, cómo y dónde trabajar.</li>
                <li>Crea una reputación sólida.</li>
              </ul>
            </div>
          </div>
          <Button onClick={() => {}} title="Comenzar ahora" widthFull />
        </div>
      </div>
    </div>
    </>
  );
};