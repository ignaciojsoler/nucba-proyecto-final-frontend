import { useNavigate } from "react-router-dom";
import { saveOnStorage } from "../helpers/handleStorage";
import { Button } from "./Button";

interface PlanCardProps {
  title: string;
  description: string;
  items: string[];
}

export const PlanCard = (props: PlanCardProps) => {
  const { title = "Plan", description = "Descripción", items = [] } = props;
  const navigate = useNavigate();
  const handleSavePlanOnStorage = () => {
    saveOnStorage('selectedPlan', {value: title.toLocaleLowerCase()});
    navigate('/signup');
  }
  return (
    <div className="bg-slate-400 bg-opacity-10 rounded-lg p-8 space-y-3">
      <h5 className="font-semibold text-lg">{title}</h5>
      <p className="text-sm leading-7">{description}</p>
      <ul className=" list-disc pb-4">
        {items.map((i) => {
          return <li className="ml-4">{i}</li>;
        })}
      </ul>
      <Button title="Elegir plan" onClick={() => handleSavePlanOnStorage()} color={`${title === "Cliente" ? "secondary" : "primary"}`} widthFull/>
    </div>
  );
};
