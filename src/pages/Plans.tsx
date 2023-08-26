import { PlanCard } from "../components/PlanCard";
import data from "../data/plans.json";
import signupImg from "../assets/img/signup-img.jpg";

const plansData = data;

const Plans = () => {
  return (
    <div className="h-full bg-cover animate-blurTransition" style={{ backgroundImage: `url(${signupImg})` }}>
      <div className="m-auto min-h-screen py-28  px-8 max-w-7xl flex justify-center items-center">
        <div className="flex flex-col space-y-10">
          <h3 className=" text-4xl text-center font-bold animate-sladeInFromBottomShort">
            Selecciona tu plan
          </h3>
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:gap-4">
            {plansData.map((plan) => {
              return (
                <PlanCard
                  key={plan.id}
                  title={plan.title}
                  description={plan.description}
                  items={plan.items}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plans;