import CategoriesFilters from "../components/CategoriesFilters";
import SearchResult from "../components/SearchResult";
import {useLocation} from "react-router-dom"

const CategoriesPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const occupation = queryParams.get('occupation');
  const category = queryParams.get('category');

  return (
    <main className="min-h-screen max-w-7xl m-auto px-6">
      <section className="flex items-start pt-28 gap-8">
        <CategoriesFilters 
        category={category}/>
        <SearchResult 
        occupation={occupation}
        category={category}
        />
      </section>
    </main>
  );
};

export default CategoriesPage;
