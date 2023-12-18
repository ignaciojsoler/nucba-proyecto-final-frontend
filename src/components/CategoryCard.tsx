import plomeriaImg from "/src/assets/img/plomeria.webp";
import electricidadImg from "/src/assets/img/electricidad.webp";
import gasImg from "/src/assets/img/gas.webp";
import cerrajeriaImg from "/src/assets/img/cerrajeria.webp";
import limpiezaImg from "/src/assets/img/limpieza.webp";
import jardineriaImg from "/src/assets/img/jardineria.webp";
import mudanzasImg from "/src/assets/img/mudanzas.webp";
import carpinteriaImg from "/src/assets/img/carpinteria.webp";
import {Link} from "react-router-dom";

interface CategoryCardProps {
  data: {
    id: number,
    name: string;
    description: string;
    image?: string;
    occupation: string;
  };
}

const categoriesImages = [
  {
    id: 1,
    image: plomeriaImg,
  },
  {
    id: 2,
    image: electricidadImg,
  },
  {
    id: 3,
    image: gasImg,
  },
  {
    id: 4,
    image: cerrajeriaImg,
  },
  {
    id: 5,
    image: limpiezaImg,
  },
  {
    id: 6,
    image: jardineriaImg,
  },
  {
    id: 7,
    image: mudanzasImg,
  },
  {
    id: 8,
    image: carpinteriaImg,
  },
];



const CategoryCard = (props: CategoryCardProps) => {
  const { data } = props;
  const categoryImage = categoriesImages.find(
    c => c.id === data.id
  )
  return (
    <Link to={`../categories/?occupation=${data.occupation}&category=${data.name}`}>
    <div className="group rounded-lg bg-slate-800 backdrop-blur-lg overflow-hidden h-24 p-3 flex w-full cursor-pointer md:h-26 lg:h-32">
      <div className="absolute -z-10 w-full h-full top-0 left-0 transition group-hover:scale-105">
        <div className="h-full w-full bg-slate-900 absolute top-0 left-0 opacity-70 transition-opacity duration-150 group-hover:opacity-40 z-20"></div>
        <img
          src={categoryImage?.image}
          alt="Category image"
          className="object-cover h-full w-full"
          loading="lazy"
        />
      </div>
      <h5 className="font-bold text-xl">{data.name}</h5>
    </div></Link>
  );
};

export default CategoryCard;