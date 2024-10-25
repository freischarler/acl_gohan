import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import './HomeNews.css';


export const HomeNews = ({ news }) => {
  return (
    <Box className="home-news fade-in">
       <div className="image-container">
          <img src={news.image} alt="Background" className="image" />
          <div className="text-container">
            <h1 className="title">{news.title}</h1>
            <h2 className="subtitle">{news.subtitle}</h2>
          </div>
        </div>
    </Box>
  );
};

HomeNews.propTypes = {
    news: PropTypes.shape({
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      subtitle: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      rankingLink: PropTypes.string.isRequired,
      nextEventLink: PropTypes.string.isRequired,
    }).isRequired,
  };