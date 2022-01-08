import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import './SavedNewsHeader.css';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function SavedNewsHeader({ articles }) {
  const { name } = useContext(CurrentUserContext);
  const [savedKeywords, setSavedKeywords] = useState('');
  useEffect(() => {
    if (articles) {
      if (articles.length === 1) {
        setSavedKeywords(articles[0].keyword);
        return;
      }
      if (articles.length === 2) {
        if (articles[0].keyword === articles[1].keyword) {
          setSavedKeywords(articles[0].keyword);
          return;
        }
        setSavedKeywords(`${articles[0].keyword} and ${articles[1].keyword}`);
        return;
      }
      if (articles.length === 3) {
        const keywordsArr = [];
        articles.forEach((article) => {
          const { keyword } = article;
          if (keywordsArr.indexOf(keyword) === -1) {
            keywordsArr.push(keyword);
          }
        });
        if (keywordsArr.length === 1) {
          setSavedKeywords(keywordsArr[0]);
          return;
        }
        if (keywordsArr.length === 2) {
          setSavedKeywords(`${keywordsArr[0]} and ${keywordsArr[1]}`);
          return;
        }
        setSavedKeywords(`${keywordsArr[0]}, ${keywordsArr[1]} and ${keywordsArr[2]}`);
      }
      if (articles.length > 3) {
        const keywordsArr = [];
        articles.forEach((article) => {
          const { keyword } = article;
          if (keywordsArr.indexOf(keyword) === -1) {
            keywordsArr.push(keyword);
          }
        });
        if (keywordsArr.length === 1) {
          setSavedKeywords(keywordsArr[0]);
          return;
        }
        if (keywordsArr.length === 2) {
          setSavedKeywords(`${keywordsArr[0]} and ${keywordsArr[1]}`);
          return;
        }
        if (keywordsArr.length === 3) {
          setSavedKeywords(`${keywordsArr[0]}, ${keywordsArr[1]} and ${keywordsArr[2]}`);
          return;
        }
        setSavedKeywords(`${keywordsArr[0]}, ${keywordsArr[1]} and ${keywordsArr.length - 2} more`);
      }
    }
  }, [articles]);
  return (
    <section className="saved-news-header">
      <h2 className="saved-news-header__title">Saved articles</h2>
      <p className="saved-news-header__subtitle">
        {name}, you have {articles ? articles.length : 0} saved articles
      </p>
      <p className="saved-news-header__keywords">
        By keywords: <span className="saved-news-header__keywords_span">{savedKeywords}</span>
      </p>
    </section>
  );
}

SavedNewsHeader.propTypes = {
  articles: PropTypes.instanceOf(Object).isRequired,
};

export default SavedNewsHeader;
