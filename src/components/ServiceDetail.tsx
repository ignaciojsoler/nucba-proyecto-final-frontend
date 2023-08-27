import { callUserPhone } from "../helpers/callUserPhone"
import { Service } from "../interfaces/interfaces"
import {
    AiOutlineHeart,
  } from "react-icons/ai";
import { Button } from "./Button";

interface ServiceDetailProps {
    service: Service
}

const ServiceDetail = ({service}: ServiceDetailProps) => {
  return (
    <article className="w-full space-y-4 animate-sladeInFromBottomShort">
            <h2 className=" text-6xl font-semibold">{service.title}</h2>
            <h5 className=" text-2xl text-slate-400 font-normal">
              {service.description}
            </h5>
            <h3 className=" text-3xl font-extrabold text-emerald-600">
              ${service.hourlyRate}/h
            </h3>
            <h5 className=" text-lg font-normal">
              Ofrecido por {service.worker.name}
            </h5>
            <div className="py-4 flex flex-col gap-y-8 gap-x-4 lg:flex-row">
              <Button
                title="Contratar ahora"
                onClick={() => callUserPhone(service.worker.phone)}
                size="large"
              />
              <Button
                title="Guardar en favoritos"
                color="dark"
                icon={<AiOutlineHeart/>}
                onClick={() => callUserPhone(service.worker.phone)}
                size="large"
              />
            </div>
          </article>
  )
}

export default ServiceDetail