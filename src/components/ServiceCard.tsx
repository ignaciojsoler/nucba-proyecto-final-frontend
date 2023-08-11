// interface ServiceCardProps {
//   id: string;
//   title: string;
//   description: string;
//   hourlyRate: number;
//   category: string;
//   userId: string;
// }

const ServiceCard = () => {
  return (
    <div className="group rounded-lg overflow-hidden bg-slate-900 grid grid-cols-6 h-48">
      <div className="space-y-1 p-6 col-span-4">
        <h4 className="font-bold text-3xl ">Título</h4>
        <h5 className="font-bold text-xl text-emerald-600">$1000/h</h5>
        <p className=" text-slate-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, minima
          quo. Dolorum veniam accusantium pariatur
        </p>
      </div>
      <div className="bg-red-400 h-full col-span-2 col-start-5"></div>
    </div>
  );
};

export default ServiceCard;
