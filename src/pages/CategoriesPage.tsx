import SearchResult from "../components/SearchResult";
import {useLocation} from "react-router-dom"

const CategoriesPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const occupation = queryParams.get('occupation');
  const category = queryParams.get('category');

  return (
    <main className="min-h-screen max-w-7xl m-auto px-6">
      <section className="flex flex-col items-center pt-28 space-y-6">
        <SearchResult 
        occupation={occupation}
        category={category}
        />
      </section>
    </main>
  );
};

export default CategoriesPage;
