import categories from "../data/categories.json";
import { Link } from "react-router-dom";
import { BsChevronDown } from "react-icons/bs";
import { useState } from "react";

interface CategoriesFiltersProps {
  category: string | null;
}

const CategoriesFilters = ({ category }: CategoriesFiltersProps) => {
  const [displayCategories, setDisplayCategories] = useState<boolean>(false);
  return (
    <article className="bg-slate-900 rounded-lg p-6 space-y-1 w-full lg:w-auto">
      <div className="flex justify-between items-center">
        <h5 className="text-xl self-start font-medium overflow-hidden whitespace-nowrap">
          Filtrar por categorías:
        </h5>
        <span
          className="lg:hidden"
          onClick={() => setDisplayCategories(!displayCategories)}
        >
          <BsChevronDown />
        </span>
      </div>
      <ul className={`${!displayCategories && "hidden lg:block"}`}>
        <Link to={`./`}>
          <p
            className={`py-1 transition duration-150 hover:opacity-80 ${
              !category ? "text-emerald-600 font-semibold" : "text-slate-400"
            }`}
          >
            Todas
          </p>
        </Link>
        {categories.categorias.map((c) => {
          return (
            <Link to={`./?occupation=${c.occupation}&category=${c.name}`}>
              <p
                className={`py-1 transition duration-150 hover:opacity-80  ${
                  c.name === category ? "text-emerald-600 font-semibold" : "text-slate-400"
                }`}
              >
                {c.name}
              </p>
            </Link>
          );
        })}
      </ul>
    </article>
  );
};

export default CategoriesFilters;
