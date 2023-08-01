import { Button } from "./components/Button"

function App() {

  return (
    <div className="bg-slate-950 text-white h-screen flex flex-col justify-center items-center py space-y-2 w-screen">

      <Button
      title="Iniciar sesión"
      onPress={() => {}}
      size="large"
      />
      <Button
      title="iniciar sesión"
      onPress={() => {}}
      size="medium"
      color="transparent"
      />
      <Button
      title="Buscar similares"
      onPress={() => {}}
      size="small"
      color="secondary"
      />
      <Button
      title="iniciar sesión"
      onPress={() => {}}
      size="medium"
      color="dark"
      />
      <Button
      title="iniciar sesión"
      onPress={() => {}}
      size="medium"
      color="light"
      />
    </div>
  )
}

export default App