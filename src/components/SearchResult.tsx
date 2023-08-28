import ServicesResults from "./ServicesResults";
import WorkersResults from "./WorkersResults";

interface SearchResultProps {
  occupation: string | null;
  category: string | null;
}

const SearchResult = ({ occupation, category }: SearchResultProps) => {
  return (
    <article className="flex flex-col gap-y-4">
      <h4 className="text-2xl md:text-3xl self-start">
        Resultados de{" "}
        <span className="font-semibold">{category}</span>
      </h4>
      <WorkersResults occupation={occupation} />
      <ServicesResults category={category} />
    </article>
  );
};

export default SearchResult;
