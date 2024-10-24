import { HomeNews } from "../components/HomeNews/HomeNews";
import logo from '../assets/new-1.webp';
export const Home = () => {
  const news = {
    image: logo,
    title: 'Beach Wrestling Argentina Open 2024',
    subtitle: 'En noviembre se realizará el torneo en Parana. Entra y conoce los detalles.',
    link: 'url-to-news',
    rankingLink: 'url-to-rankings',
    nextEventLink: 'url-to-next-event',
  };

  return (
    <div>
      <HomeNews news={news} />
    </div>
  );
};