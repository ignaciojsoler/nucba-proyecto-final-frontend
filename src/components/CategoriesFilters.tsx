import categories from "../data/categories.json";
import { Link } from "react-router-dom";

interface CategoriesFiltersProps {
    category: string | null;
}

const CategoriesFilters = ({category}: CategoriesFiltersProps) => {
  return (
    <article className="bg-slate-900 rounded-lg p-6 space-y-1">
      <h5 className=" text-xl self-start font-medium">
        Filtrar por categorías:
      </h5>
      <ul className="">
        {categories.categorias.map((c) => {
          return (
            <Link to={`./?category=${c.name}`}>
              <p className={`py-1 transition duration-150 hover:opacity-80 text-slate-400 ${c.name === category && "text-slate-100 font-semibold"}`}>{c.name}</p>
            </Link>
          );
        })}
      </ul>
    </article>
  );
};

export default CategoriesFilters;
