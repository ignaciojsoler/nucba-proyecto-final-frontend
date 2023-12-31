import { Categories } from "../components/Categories";
import { Workers } from '../components/Workers';
import Services from '../components/Services';
import Banner from "../components/Banner";

const Home = () => {

  return (
    <main className="min-h-screen max-w-7xl m-auto px-6">
      <section className="flex flex-col items-center pt-28 space-y-6">
        <Banner/>
        <Categories/>
        <Workers/>
        <Services/>
      </section>
    </main>
  );
};

export default Home;
