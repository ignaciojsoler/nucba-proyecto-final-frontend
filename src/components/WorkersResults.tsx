import { useState, useEffect } from "react";
import { getUsers } from "../services/services";
import WorkerCardSkeleton from "./Skeletons/WorkerCardSkeleton";
import WorkerCard from "./WorkerCard";
import { User } from "../interfaces/interfaces";
import { Button } from "./Button";

interface WorkersResultsProps {
  occupation: string | null;
}

const WorkersResults = ({ occupation }: WorkersResultsProps) => {
  const [workers, setWorkers] = useState<User[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [take, setTake] = useState<number>(5);
  const [totalUsers, setTotalUsers] = useState<number>(0); // Total number of users in the database

  const handleGetWorkers = async () => {
    try {
      const workersData = await getUsers("worker", {
        occupation,
        take,
      });
      if (!workersData) return;

      setWorkers(workersData.data.users);
      setIsLoading(false);
      
      // Assuming that workersData.data.totalUsers holds the total number of users in the database
      setTotalUsers(workersData.data.totalUsers);
      console.log(workersData.data.totalUsers)
    } catch (error) {
      console.error("Error fetching workers:", error);
    }
  };

  useEffect(() => {
    handleGetWorkers();
    console.log(take)
  }, [occupation, take]);

  const handleLoadMore = () => {
    setTake((prevTake) => prevTake + 5);
  };

  return (
    <article className="w-full">
      <div className="flex flex-col gap-y-4">
        <h4 className=" text-xl self-start font-semibold">Trabajadores</h4>
        {isLoading || !workers ? (
          <WorkerCardSkeleton />
        ) : (
          <>
            {workers.length ? (
              workers.map((worker) => (
                <WorkerCard key={worker.id} worker={worker} />
              ))
            ) : (
              <p>No se han encontrado trabajadores para esta categoría</p>
            )}
            {!isLoading && totalUsers > take && (
              <Button onClick={() => handleLoadMore()} color="transparent" title="Cargar más" className="m-auto" />
            )}
          </>
        )}
      </div>
    </article>
  );
};

export default WorkersResults;
