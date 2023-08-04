import logoIcon from "../assets/icons/logo.svg";

interface LoadingProps {
  loadingPercentage: number;
}

const Loading = ({ loadingPercentage }: LoadingProps) => {
  return (
    <div className="max-w-7xl m-auto min-w-screen min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 flex">
      <div className="h-full m-auto space-y-6 animate-fadeIn">
        <div role="status">
          <div className="space-y-4">
            <img src={logoIcon} className="m-auto" />
          </div>
        </div>
        <h4 className=" text-4xl font-semibold">
          {Math.round(loadingPercentage)} %
        </h4>
      </div>
    </div>
  );
};

export default Loading;
