import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Loader } from "../components/Loader";
import { getWorkerById } from "../services/services";
import { User } from "../interfaces/interfaces";
import ProfileCard from "../components/ProfileCard";
import ServiceCard from "../components/ServiceCard";

const WorkerDetail = () => {
  const { pathname } = useLocation();
  const workerId = pathname.substring(pathname.lastIndexOf("/") + 1);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [worker, setWorker] = useState<User | null>(null);

  const handleGetWorkerById = async () => {
    const workerData = await getWorkerById(workerId);
    setIsLoading(false);
    if (!workerData)
      return alert("Algo ha salido mal, intentalo de nuevo más tarde");
    if (workerData.status !== 200) {
      return alert(workerData.data.msg);
    }
    setWorker(workerData.data.userData);
  };

  useEffect(() => {
    handleGetWorkerById();
    console.log(worker);
  }, []);

  if (!worker) return null;

  return (
    <>
      {isLoading && <Loader />}
      <section className="min-h-screen max-w-7xl m-auto px-6 pb-12">
        <div className="pt-28 h-full w-full flex flex-col items-start lg:flex-row gap-8">
          <ProfileCard worker={worker} />
          <article className="w-full space-y-4">
          <h4 className=" text-2xl font-semibold self-start animate-sladeInFromBottomMedium">Servicios</h4>
            <div className="grid grid-cols-1 gap-6 w-full md:p-0 md:grid-cols-2 animate-sladeInFromBottomLong">
              {worker.services?.map((s) => {
                return <ServiceCard service={{ ...s, worker }} />;
              })}
            </div>
          </article>
        </div>
      </section>
    </>
  );
};

export default WorkerDetail;
