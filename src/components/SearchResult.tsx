import ServicesResults from "./ServicesResults";
import WorkersResults from "./WorkersResults";

interface SearchResultProps {
  occupation: string | null;
  category: string | null;
}

const SearchResult = ({ occupation, category }: SearchResultProps) => {
  return (
    <>
      <h4 className=" text-3xl self-start">
        Resultados de{" "}
        <span className="font-semibold">{category}</span>
      </h4>
      <WorkersResults occupation={occupation} />
      <ServicesResults category={category} />
    </>
  );
};

export default SearchResult;
