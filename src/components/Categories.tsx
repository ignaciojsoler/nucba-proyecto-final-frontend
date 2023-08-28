import data from "../data/categories.json";
import CategoryCard from "../components/CategoryCard";
import { Link } from "react-router-dom";

export const Categories = () => {
  return (
    <article className="w-full space-y-4 py-4 animate-sladeInFromBottomMedium">
      <div className="flex justify-between items-end">
        <h4 className=" text-2xl font-semibold self-start">Categorías</h4>
        <Link className=" font-semibold" to="/categories">
          Ver todas
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-3 w-full md:p-0 md:grid-cols-4 ">
        {data.categorias.map((c) => {
          return (
            <CategoryCard
              key={c.id}
              data={{
                id: c.id,
                name: c.name,
                description: c.description,
                image: c.image,
                occupation: c.occupation
              }}
            />
          );
        })}
      </div>
    </article>
  );
};
