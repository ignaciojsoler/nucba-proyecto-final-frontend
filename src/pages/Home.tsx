import Input from "../components/Input";
import { useState } from "react";
import data from "../data/categories.json";
import CategoryCard from "../components/CategoryCard";
import banner from '../assets/img/banner.jpg';

const Home = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  return (
    <main className="min-h-screen max-w-7xl m-auto px-6">
      <section className="flex flex-col items-center pt-28 space-y-6">
        <div className=" rounded-xl overflow-hidden">
          <img src={banner} alt="banner" />
        </div>
        {/* <h3 className=" text-3xl font-semibold">¿Qué estás buscando?</h3> */}
        {/* <Input
          onChangeText={setSearchInput}
          value={searchInput}
          className="w-80 md:w-96"
          placeholder="Buscar..."
        /> */}
        <div className="w-full space-y-4 py-4">
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
        </div>
      </section>
    </main>
  );
};

export default Home;
