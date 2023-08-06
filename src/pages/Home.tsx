import Input from "../components/Input";
import { useState } from "react";
import data from '../data/categories.json';
import CategoryCard from "../components/CategoryCard";

const Home = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  return (
    <div className="min-h-screen max-w-7xl m-auto px-6">
      <div className="flex flex-col items-center pt-28 space-y-6">
        <h3 className=" text-3xl font-semibold">¿Qué estás buscando?</h3>
        <Input onChangeText={setSearchInput} value={searchInput} className="w-80 md:w-96" placeholder="Buscar..."/>
        <div className="grid grid-cols-2 gap-3 w-full p-3 md:p-0 md:grid-cols-4 ">
            {data.categorias.map((c) => {
                return <CategoryCard key={c.id} data={{
                    name: c.nombre,
                    description: c.description,
                    image: c.image
                }}/>
            })}
        </div>
      </div>
    </div>
  );
};

export default Home;
