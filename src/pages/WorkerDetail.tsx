import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Loader } from "../components/Loader";
import { getWorkerById } from "../services/services";
import { User } from "../interfaces/interfaces";
import ProfileCard from "../components/ProfileCard";

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
      <section className="min-h-screen max-w-7xl m-auto px-6">
        <div className="pt-28 h-full w-full flex flex-col items-center lg:flex-row">
          <ProfileCard 
          worker={worker}
          />
        </div>
      </section>
    </>
  );
};

export default WorkerDetail;
