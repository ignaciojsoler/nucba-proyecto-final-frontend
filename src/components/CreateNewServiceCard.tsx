import {MdAdd} from "react-icons/md";
import { useNavigate } from "react-router-dom";

const CreateNewServiceCard = () => {
    const navigate = useNavigate();

  return (
    <div
      className="group rounded-lg overflow-hidden bg-emerald-600 flex flex-col justify-center items-center gap-y-4 cursor-pointer transition duration-150 opacity-80 hover:opacity-100 animate-sladeInFromBottomShort"
      style={{ minHeight: "11.25rem" }}
      onClick={() => navigate(`../service/edit/create`)}
    >
      <h5 className="font-bold text-xl text-slate-100">Crear servicio nuevo</h5>
      <button className="bg-emerald-700 rounded-full p-2"><MdAdd className="w-10 h-10"/></button>
    </div>
  )
}

export default CreateNewServiceCard