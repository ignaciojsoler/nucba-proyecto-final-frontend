import ServicesResults from "./ServicesResults";
import WorkersResults from "./WorkersResults";

interface SearchResultProps {
  occupation: string | null;
  category: string | null;
}

const SearchResult = ({ occupation, category }: SearchResultProps) => {
  return (
    <article className="flex flex-col">
      <h4 className=" text-3xl self-start">
        Resultados de{" "}
        <span className="font-semibold">{category}</span>
      </h4>
      <WorkersResults occupation={occupation} />
      <ServicesResults category={category} />
    </article>
  );
};

export default SearchResult;
