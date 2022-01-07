import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import './SavedNewsHeader.css';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function SavedNewsHeader({ result }) {
  const { name } = useContext(CurrentUserContext);
  const [savedKeywords, setSavedKeywords] = useState('');
  useEffect(() => {
    if (result) {
      if (result.length === 1) {
        setSavedKeywords(result[0].keyword);
        return;
      }
      if (result.length === 2) {
        if (result[0].keyword === result[1].keyword) {
          setSavedKeywords(result[0].keyword);
          return;
        }
        setSavedKeywords(`${result[0].keyword} and ${result[1].keyword}`);
        return;
      }
      if (result.length === 3) {
        const keywordsArr = [];
        result.forEach((article) => {
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
      if (result.length > 3) {
        const keywordsArr = [];
        result.forEach((article) => {
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
  }, [result]);
  return (
    <section className="saved-news-header">
      <h2 className="saved-news-header__title">Saved articles</h2>
      <p className="saved-news-header__subtitle">
        {name}, you have {result && result.length} saved articles
      </p>
      <p className="saved-news-header__keywords">
        By keywords: <span className="saved-news-header__keywords_span">{savedKeywords}</span>
      </p>
    </section>
  );
}

SavedNewsHeader.propTypes = {
  result: PropTypes.instanceOf(Object),
};

SavedNewsHeader.defaultProps = {
  result: [],
};

export default SavedNewsHeader;
