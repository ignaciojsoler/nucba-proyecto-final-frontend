import { useState, useEffect } from "react";
import { getUsers } from "../services/services";
import WorkerCardSkeleton from "./Skeletons/WorkerCardSkeleton";
import WorkerCard from "./WorkerCard";
import { User } from "../interfaces/interfaces";

interface WorkersResultsProps {
  occupation: string | null;
}

const WorkersResults = ({ occupation }: WorkersResultsProps) => {
  const [workers, setWorkers] = useState<User[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleGetWorkers = async () => {
    const workersData = await getUsers("worker", { occupation });
    if (!workersData) return;
    setWorkers(workersData.data.users);
    setIsLoading(false);
  };

  useEffect(() => {
    handleGetWorkers();
  }, [occupation]);

  return (
    <article className="w-full">
      <div className="flex flex-col gap-y-4">
        <h4 className=" text-xl self-start font-semibold">Trabajadores</h4>
        {isLoading || !workers ? (
          <WorkerCardSkeleton />
        ) : (
          <>
            {workers.length ? (
              workers?.map((worker) => <WorkerCard key={worker.id} worker={worker} />)
            ) : (
              <p>No se han encontrado trabajadores para esta categoría</p>
            )}
          </>
        )}
      </div>
    </article>
  );
};

export default WorkersResults;
