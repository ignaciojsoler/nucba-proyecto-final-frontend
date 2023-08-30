import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getUserById } from "../services/services";
import { User } from "../interfaces/interfaces";
import ProfileCard from "../components/ProfileCard";
import ServiceCard from "../components/ServiceCard";
import ServiceCardSkeleton from "../components/Skeletons/ServiceCardSkeleton";
import ProfileCardSkeleton from "../components/Skeletons/ProfileCardSkeleton";
import { isExpired, decodeToken } from "react-jwt";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import CreateNewServiceCard from "../components/CreateNewServiceCard";

const WorkerDetail = () => {
  const { pathname } = useLocation();
  const userId = pathname.substring(pathname.lastIndexOf("/") + 1);

  const token = useSelector((state: RootState) => state.token);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [worker, setWorker] = useState<User | null>(null);
  const [userDecodedToken, setUserDecodedToken] = useState<User | null>(null);

  const getUserDecodedToken = async () => {
    if (!token.token) return;
    if (isExpired(token.token)) return;
    const decodedToken = decodeToken<User>(token.token);
    if (!decodedToken) return;
    setUserDecodedToken(decodedToken);
  };

  const handleGetWorkerById = async () => {
    const workerData = await getUserById(userId);
    setIsLoading(false);
    if (!workerData)
      return console.log("Algo ha salido mal, intentalo de nuevo más tarde");
    if (workerData.status !== 200) {
      return console.log(workerData.data.msg);
    }
    setWorker(workerData.data.userData);
  };

  useEffect(() => {
    getUserDecodedToken();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
      handleGetWorkerById();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDecodedToken]);

  return (
    <section className="min-h-screen max-w-7xl m-auto px-6 pb-12">
      <div className="pt-28 h-full w-full flex flex-col items-start lg:flex-row gap-8">
        {isLoading || !worker ? (
          <ProfileCardSkeleton />
        ) : (
          <ProfileCard
            worker={worker}
            className="animate-sladeInFromBottomShort"
            userId={userDecodedToken?.id}
          />
        )}
        <article className="w-full space-y-4">
          <h4 className=" text-2xl font-semibold self-start animate-sladeInFromBottomMedium">
            Servicios
          </h4>
          <div className="grid grid-cols-1 gap-6 w-full md:p-0 md:grid-cols-2 animate-sladeInFromBottomMedium">
            {(userDecodedToken?.id === worker?.id && userDecodedToken?.updatedAt) && <CreateNewServiceCard/>}
            {isLoading || !worker
              ? Array.from({ length: 8 }, (_, index) => (
                  <ServiceCardSkeleton key={index} />
                ))
              : worker?.services?.map((s) => {
                  return (
                    <ServiceCard
                      service={{ ...s, worker }}
                      key={s.id}
                      userId={userDecodedToken?.id}
                    />
                  );
                })}
          </div>
        </article>
      </div>
    </section>
  );
};

export default WorkerDetail;
