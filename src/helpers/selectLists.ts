import provincesData from "../data/provinces.json";
import categoriesData from "../data/categories.json";

export const categoriesList = categoriesData.categorias.map((categoria) => ({
  value: categoria.name,
  label: categoria.name,
}));

export const provincesList = provincesData.provincias.map((province) => ({
  value: province.nombre,
  label: province.nombre,
}));

export const sortedProvincesList = provincesList
  .slice()
  .sort((a, b) => a.label.localeCompare(b.label));

export const rolesList = [
  { value: "CLIENT", label: "Cliente" },
  { value: "WORKER", label: "Trabajador" },
];
