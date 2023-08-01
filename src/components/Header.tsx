import { Button } from "./Button"


export const Navbar = () => {
  return (
    <nav className="px-6 py-6 flex justify-center">
        <Button
        title="Iniciar sesión"
        size="medium"
        color="transparent"
        onClick={() => {}}/>
        <Button
        title="Registrarse"
        size="medium"
        onClick={() => {}}/>
    </nav>
  )
}
