import { Button } from "./Button";

export const Navbar = () => {
  return (
    <nav className="absolute w-full">
      <div className="px-6 py-6 flex justify-center m-auto md:justify-end lg:max-w-7xl">
        <Button
          title="Iniciar sesión"
          size="medium"
          color="transparent"
          onClick={() => {}}
        />
        <Button title="Registrarse" size="medium" onClick={() => {}} />
      </div>
    </nav>
  );
};
