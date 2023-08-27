import ContentLoader from "react-content-loader";

const ProfileCardSkeleton = () => {
  return (
    <div className=" bg-slate-900 rounded-lg animate-sladeInFromBottomShort w-full lg:w-[21.5rem] flex justify-center p-6">
      <ContentLoader
        speed={2}
        height={400}
        backgroundColor="rgb(30 41 59)"
        foregroundColor="rgb(51 65 85)"
      >
        <circle cx="50%" cy="55" r="50"/>
        <rect x="5%" y="150" rx="2" ry="2" width="90%" height="10" />
        <rect x="10%" y="190" rx="2" ry="2" width="30%" height="10" />
        <rect x="55%" y="190" rx="2" ry="2" width="30%" height="10" />
      </ContentLoader>
    </div>
  )
}

export default ProfileCardSkeleton