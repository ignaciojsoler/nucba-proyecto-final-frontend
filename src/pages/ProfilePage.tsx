import { useEffect, useState } from "react";
import ProfileCardSkeleton from "../components/Skeletons/ProfileCardSkeleton";
import ProfileCard from "../components/ProfileCard";
import { getUserById } from "../services/services";
import { User } from "../interfaces/interfaces";
import { AxiosResponse } from "axios";
import {  useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../store/store";
import { isExpired, decodeToken } from "react-jwt";

const ProfilePage = () => {
  const token = useSelector((state: RootState) => state.token);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  const handleGetUserById = async () => {
    if (!token.token) return;
    if (isExpired(token.token)) return;
    const decodedToken = decodeToken<User>(token.token);
    if (!decodedToken) return;
    const userData: AxiosResponse = await getUserById(decodedToken.id);
    setIsLoading(false);
    if (!userData)
      return console.log("Algo ha salido mal, intentalo de nuevo más tarde");
    if (userData.status !== 200) {
      return console.log(userData.data.msg);
    }
    setUser(userData.data.userData);
  };

  useEffect(() => {
    handleGetUserById();
  }, []);

  return (
    <section className="min-h-screen max-w-7xl m-auto px-6 pb-12">
      <div className="pt-28 h-full w-full flex flex-col items-start lg:flex-row gap-8">
        {isLoading || !user ? (
          <ProfileCardSkeleton />
        ) : (
          <ProfileCard
            worker={user}
            className="animate-sladeInFromBottomShort"
          />
        )}
        <article className="w-full space-y-4">
          <h4 className=" text-2xl font-semibold self-start animate-sladeInFromBottomMedium">
            Servicios
          </h4>
          <div className="grid grid-cols-1 gap-6 w-full md:p-0 md:grid-cols-2 animate-sladeInFromBottomMedium">
            {/* {isLoading || !user
              ? Array.from({ length: 8 }, (_, index) => (
                  <ServiceCardSkeleton key={index} />
                ))
              : user?.services?.map((s) => {
                  return <ServiceCard service={{ ...s, worker }} key={s.id} />;
                })} */}
          </div>
        </article>
      </div>
    </section>
  );
};

export default ProfilePage;
