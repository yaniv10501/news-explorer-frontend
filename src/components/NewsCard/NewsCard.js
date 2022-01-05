import React from 'react';
import PropTypes from 'prop-types';
import './NewsCard.css';

function NewsCard({
  article: {
    source: { name: source },
    title,
    description: text,
    publishedAt: date,
    url: link,
    urlToImage: image,
  },
  children,
}) {
  const handleArticleClick = (event) => {
    if (
      event.target.className.indexOf('news-card__save') === -1 &&
      event.target.className.indexOf('news-card__delete') === -1
    ) {
      window.open(link, '_blank');
    }
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
        <img className="news-card__image" src={image} alt="Article card cover" />
        <div className="news-card__text-container">
          <p className="news-card__date">{date}</p>
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
  children: PropTypes.instanceOf(Object).isRequired,
};

export default NewsCard;
