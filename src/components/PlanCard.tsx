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
    saveOnStorage("selectedPlan", title.toLocaleLowerCase());
    navigate("/signup");
  };
  return (
    <div className={` rounded-lg p-8 space-y-3 bg-slate-800 bg-opacity-40 backdrop-blur-lg ${title === "Cliente" ? "animate-sladeInFromBottomMedium" : "animate-sladeInFromBottomLong"}`}>
      <h5 className="font-semibold text-2xl">{title}</h5>
      <p className="leading-7">{description}</p>
      <ul className=" list-disc pb-4 space-y-3">
        {items.map((i) => {
          return <li className="ml-4">{i}</li>;
        })}
      </ul>
      <Button
        title="Elegir plan"
        onClick={() => handleSavePlanOnStorage()}
        color={`${title === "Cliente" ? "secondary" : "primary"}`}
        widthFull
      />
    </div>
  );
};
