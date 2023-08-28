import ContentLoader from "react-content-loader";

const WorkerCardSkeleton = () => {
  return (
    <div className=" bg-slate-900 rounded-lg">
      <ContentLoader
        speed={2}
        width="full"
        height={180}
        backgroundColor="rgb(30 41 59)"
        foregroundColor="rgb(51 65 85)"
        className="space-y-6"
      >
        <rect x="32" y="32" rx="2" ry="2" width="180" height="10" />
        <rect x="32" y="56" rx="2" ry="2" width="70" height="10" />
        <rect x="32" y="78" rx="2" ry="2" width="140" height="10" />
        <circle cx="90%" cy="40" r="15" /> 
      </ContentLoader>
    </div>
  );
};

export default WorkerCardSkeleton;
