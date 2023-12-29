import websiteIcon from "../assets/icons/website-icon.svg";
import emailIcon from "../assets/icons/email-icon.svg";
import linkedinIcon from "../assets/icons/linkedin-icon.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "Linkedin",
      url: "https://www.linkedin.com/in/ignaciojsoler/",
      icon: linkedinIcon,
    },
    {
      name: "Email",
      url: "mailto:ignaciojsoler@gmail.com",
      icon: emailIcon,
    },
    {
      name: "Website",
      url: "https://ignaciojsoler.github.io/landing-page/",
      icon: websiteIcon,
    },
  ];

  return (
    <footer className="py-8 bg-slate-900 flex flex-col items-center gap-y-5">
      <ul className="flex justify-center items-center gap-x-4">
        {socialLinks.map(({ url, name, icon }, index) => {
          return (
            <li key={index}>
              <Link
                to={url}
                target="_blank"
                className=" border rounded-full p-3 flex items-center justify-center transition duration-150  hover:opacity-60"
              >
                <img src={icon} alt={name} className="h-4" loading="lazy" />
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="space-y-2">
        <p className="text-center">
          © <span>{currentYear} Todos los derechos reservados.</span>
        </p>
        <p className="text-center text-sm text-emerald-600 font-semibold">
          Desarrollado por Ignacio Soler
        </p>
      </div>
    </footer>
  );
};

export default Footer;
