import { useLocation } from "react-router-dom"

const ServiceDetail = () => {
  const {pathname} = useLocation();
  return (
    <div className="h-screen w-screen flex justify-center items-center">
        <p>Llamar endpoint del service: {pathname}</p>
    </div>
  )
}

export default ServiceDetail