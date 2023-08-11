import data from "../data/categories.json";
import CategoryCard from "../components/CategoryCard";

export const Categories = () => {
  return (
    <article className="w-full space-y-4 py-4 animate-sladeInFromBottomMedium">
      <h4 className=" text-2xl font-semibold self-start">Categorías</h4>
      <div className="grid grid-cols-2 gap-3 w-full md:p-0 md:grid-cols-4 ">
        {data.categorias.map((c) => {
          return (
            <CategoryCard
              key={c.id}
              data={{
                name: c.nombre,
                description: c.description,
                image: c.image,
              }}
            />
          );
        })}
      </div>
    </article>
  );
};
