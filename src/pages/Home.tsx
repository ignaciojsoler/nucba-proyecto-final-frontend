import banner from '../assets/img/banner.jpg';
import { Categories } from "../components/Categories";
import { Workers } from '../components/Workers';
import Services from '../components/Services';

const Home = () => {
  // const [searchInput, setSearchInput] = useState<string>("");
  return (
    <main className="min-h-screen max-w-7xl m-auto px-6">
      <section className="flex flex-col items-center pt-28 space-y-6">
        <article className=" rounded-xl overflow-hidden">
          <img src={banner} alt="banner" className="animate-sladeInFromBottomShort"/>
        </article>
        <Categories/>
        <Workers/>
        <Services/>
      </section>
    </main>
  );
};

export default Home;
