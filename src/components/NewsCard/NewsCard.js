import React from 'react';
import PropTypes from 'prop-types';
import './NewsCard.css';
import noImage from '../../images/no-image.png';
import formatArticleDate from '../../utils/formatArticleDate';

function NewsCard({ article, handleImageLoad, children }) {
  const {
    source: { name: source },
    title,
    description: text,
    publishedAt: date,
    url: link,
    urlToImage: image,
  } = article.publishedAt
    ? article
    : {
        source: { name: article.source },
        title: article.title,
        description: article.text,
        publishedAt: article.date,
        url: article.link,
        urlToImage: article.image,
      };
  const handleArticleClick = (event) => {
    if (
      event.target.className.indexOf('news-card__save') === -1 &&
      event.target.className.indexOf('news-card__delete') === -1
    ) {
      window.open(link, '_blank');
    }
  };
  const handleImageError = (event) => {
    const currentImage = event.target;
    currentImage.src = noImage;
  };
  return (
    <li className="news-card">
      <div
        className="news-card__container"
        onClick={handleArticleClick}
        onKeyDown={() => {}}
        role="button"
        tabIndex={0}
      >
        <img
          className="news-card__image"
          src={image || noImage}
          alt="Article card cover"
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
        <div className="news-card__text-container">
          <p className="news-card__date">{formatArticleDate(date)}</p>
          <h3 className="news-card__title">{title}</h3>
          <p className="news-card__description">{text}</p>
          <p className="news-card__source">{source}</p>
        </div>
        {children}
      </div>
    </li>
  );
}

NewsCard.propTypes = {
  article: PropTypes.instanceOf(Object).isRequired,
  handleImageLoad: PropTypes.func.isRequired,
  children: PropTypes.instanceOf(Object).isRequired,
};

export default NewsCard;
