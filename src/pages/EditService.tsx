import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Service, User } from "../interfaces/interfaces";
import {
  createNewService,
  getServiceById,
  updateService,
} from "../services/services";
import { Loader } from "../components/Loader";
import Input from "../components/Input";
import { Button } from "../components/Button";
import SelectInput from "../components/SeletInput";
import categoriesData from "../data/categories.json";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { AxiosResponse } from "axios";
import { validateInput } from "../helpers/inputValidators";

const categories = categoriesData.categorias.map((categoria) => ({
  value: categoria.name,
  label: categoria.name,
}));

const initialServiceState: Service = {
  id: "",
  title: "",
  description: "",
  category: "",
  hourlyRate: "",
  userId: "",
  worker: {} as User,
};

const EditService = () => {
  const { pathname } = useLocation();
  const serviceId = pathname.substring(pathname.lastIndexOf("/") + 1);

  const token = useSelector((state: RootState) => state.token.token);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [service, setService] = useState<Service>(initialServiceState);

  const handleGetServiceById = async () => {
    const serviceData = await getServiceById(serviceId);
    setIsLoading(false);
    if (!serviceData)
      return console.log("Algo ha salido mal, intentalo de nuevo más tarde");
    if (serviceData.status !== 200) {
      return console.log(serviceData.data.msg);
    }
    setService(serviceData.data);
  };

  const handleRemoveService = () => {
    alert("estas seguro?");
  };

  const handleSubmit = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();

    const [titleErrores] = validateInput(service?.title, [
      "notEmpty",
      "minLength:12",
      "maxLength:60",
    ]);

    const [hourlyRateValidations] = validateInput(
      service?.hourlyRate.toString(),
      ["isGreaterThanZero", "maxLength:60"]
    );

    const [categoryValidations] = validateInput(service?.category, [
      "notEmpty",
    ]);

    const [descriptionValidations] = validateInput(service?.description, [
      "notEmpty",
      "minLength:24",
      "maxLength:140",
    ]);

    if (
      titleErrores.length > 0 ||
      hourlyRateValidations.length > 0 ||
      categoryValidations.length > 0 ||
      descriptionValidations.length > 0
    ) {
      alert(
        "¡Ups! Alguno de los campos ingresados es incorrecto. Por favor, revisa los campos y vuelve a intentarlo."
      );
      return;
    }

    setIsLoading(true);

    if (service?.id && token) {
      const updatedService: AxiosResponse = await updateService(token, service);
      setIsLoading(false);
      if (!updatedService || updatedService.status !== 200)
        return alert(
          "No se ha podido actualizar el servicio. Inténtalo de nuevo más tarde."
        );
      return console.log(updatedService);
    }
    if (token) {
      const createdService: AxiosResponse = await createNewService(
        token,
        service.title,
        service.description,
        service.category,
        service.hourlyRate
      );
      setIsLoading(false);
      if (!createdService || createdService.status !== 200)
        return alert(
          "No se ha podido crear el servicio. Inténtalo de nuevo más tarde."
        );
      return console.log(createdService);
    }

    setIsLoading(false);
    return alert("Debes ingresar a una sesión para hacer esto.")
  };

  useEffect(() => {
    handleGetServiceById();
  }, []);

  return (
    <div className="m-auto w-full h-screen flex flex-col justify-center items-center bg-cover animate-blurTransition">
      {isLoading && <Loader />}
      <div className="p-8 space-y-4 rounded-xl w-full max-w-xl animate-sladeInFromBottomMedium">
        <form
          className="space-y-4 animate-sladeInFromBottomLong"
          onSubmit={(e) => handleSubmit(e)}
        >
          <h3 className=" text-center text-3xl font-bold mb-4">Tu servicio</h3>
          <Input
            placeholder="Título"
            onChangeText={(text) => {
              if (service) {
                setService((prevState: Service | null) => ({
                  ...prevState!,
                  title: text,
                }));
              }
            }}
            value={service?.title}
            validations={["notEmpty", "minLength:12", "maxLength:60"]}
          />
          <Input
            placeholder="Precio por hora"
            onChangeText={(number) => {
              if (service) {
                setService((prevState: Service | null) => ({
                  ...prevState!,
                  hourlyRate: parseInt(number) | 0,
                }));
              }
            }}
            type="number"
            value={service?.hourlyRate}
            validations={["isGreaterThanZero", "maxLength:60"]}
          />
          <SelectInput
            placeholder="Seleccionar categoría"
            options={categories}
            onChange={(category) =>
              setService((prevState: Service | null) => ({
                ...prevState!,
                category,
              }))
            }
            value={service?.category}
          />
          <Input
            placeholder="Descripción"
            onChangeText={(text) => {
              if (service) {
                setService((prevState: Service | null) => ({
                  ...prevState!,
                  description: text,
                }));
              }
            }}
            value={service?.description}
            validations={["notEmpty", "minLength:24", "maxLength:140"]}
            type="textarea"
            rows={3}
          />
          <Button
            title={service?.id ? "Actualizar" : "Crear servicio"}
            className="w-full"
            onClick={() => {}}
          />
        </form>
        {service?.id && (
          <Button
            title="Eliminar"
            onClick={() => handleRemoveService()}
            widthFull
            color="outline"
          />
        )}
      </div>
    </div>
  );
};

export default EditService;
