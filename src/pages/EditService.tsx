import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Service, User } from "../interfaces/interfaces";
import {
  createNewService,
  deleteService,
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
import Modal from "../components/Modal";

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

  const navigate = useNavigate();

  const token = useSelector((state: RootState) => state.token.token);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [service, setService] = useState<Service>(initialServiceState);
  const [displayModal, setDisplayModal] = useState<boolean>(false);

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
      const updatedService: AxiosResponse = await updateService(
        token,
        service.id,
        service.title,
        service.description,
        service.category,
        service.hourlyRate
      );
      setIsLoading(false);
      if (!updatedService || updatedService.status !== 200)
        return alert(
          "No se ha podido actualizar el servicio. Inténtalo de nuevo más tarde."
        );
      return navigate("/profile");
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
      return navigate("/profile");
    }

    setIsLoading(false);
    return alert("Debes ingresar a una sesión para hacer esto.");
  };

  const handledeleteService = async () => {
    setDisplayModal(false);
    if (!token) return;
    setIsLoading(true);
    const createdService: AxiosResponse = await deleteService(
      token,
      service.id
    );
    setIsLoading(false);
    if (!createdService || createdService.status !== 200)
      return alert(
        "No se ha podido eliminar el servicio. Inténtalo de nuevo más tarde."
      );
    navigate("/profile");
  };

  useEffect(() => {
    handleGetServiceById();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="m-auto w-full h-screen flex flex-col justify-center items-center bg-cover animate-sladeInFromBottomMedium">
      <Modal
        display={displayModal}
        title="¿Estás seguro de eliminar este servicio?"
        text="Una vez que elimines el servicio, no habrá manera de recuperarlo."
        confirmText="Eliminar"
        handleConfirm={() => handledeleteService()}
        handleCloseModal={() => {
          setDisplayModal(false);
        }}
      />
      {isLoading && <Loader />}
      <div className="p-8 space-y-4 rounded-xl w-full max-w-xl">
        <form className="space-y-4" onSubmit={(e) => handleSubmit(e)}>
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
            onClick={() => setDisplayModal(true)}
            widthFull
            color="outline"
          />
        )}
      </div>
    </div>
  );
};

export default EditService;
