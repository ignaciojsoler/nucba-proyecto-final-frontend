import { useEffect, useState } from "react";
import { getWorkers } from "../services/services"
import { User } from "../interfaces/interfaces";
import WorkerCard from "./WorkerCard";
import { Link } from "react-router-dom";

export const Workers = () => {

  const [workers, setWorkers] = useState<User[] | null>(null);

  const handleGetWorkers = async () => {
    const wokersData = await getWorkers();
    if (!wokersData) return;
    setWorkers(wokersData.data.workers);
  }

  useEffect(() => {
    handleGetWorkers();
  }, []);

  return (
    <article className="w-full space-y-4 py-4 animate-sladeInFromBottomLarge">
      <div className="flex justify-between items-end">
      <h4 className=" text-2xl font-semibold self-start">Trabajadores</h4>
      <Link className=" font-semibold" to="/categories">Ver más</Link>
      </div>
      <div className="grid grid-cols-1 gap-6 w-full md:p-0 md:grid-cols-2">
      {workers?.map((worker) => {
        return (
          <WorkerCard 
          key={worker.id}
          worker={worker}
          />
        );
      })}
    </div>
  </article>
  )
}
