interface CategoryCardProps {
  data: {
    name: string;
    description: string;
    image?: string;
  };
}

const CategoryCard = (props: CategoryCardProps) => {
  const { data } = props;
  return (
    <div className="group rounded-lg bg-slate-800 backdrop-blur-lg overflow-hidden h-24 p-3 flex w-full cursor-pointer md:h-26 lg:h-32">
      <div className="absolute -z-10 w-full h-full top-0 left-0 transition group-hover:scale-105">
        <div className="h-full w-full bg-slate-900 absolute top-0 left-0 opacity-70 transition-opacity duration-150 group-hover:opacity-40"></div>
        <img
          src={data.image}
          alt="category image"
          className="object-cover h-full w-full"
        />
      </div>
      <h5 className="font-bold text-xl">{data.name}</h5>
    </div>
  );
};

export default CategoryCard;