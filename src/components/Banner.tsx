import banner from '../assets/img/banner.jpg';

const Banner = () => {
  return (
    <article className=" rounded-xl overflow-hidden">
          <img src={banner} alt="Banner" className="animate-sladeInFromBottomShort" loading="lazy"/>
        </article>
  )
}

export default Banner