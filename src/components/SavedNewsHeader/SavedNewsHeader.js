import React, { useState, useEffect } from 'react';
import testArticles from '../../assets/testArticles';
import './SavedNewsHeader.css';

function SavedNewsHeader() {
  const [savedKeywords, setSavedKeywords] = useState('');
  useEffect(() => {
    if (testArticles.length === 1) {
      setSavedKeywords(testArticles[0].keyword);
      return;
    }
    if (testArticles.length === 2) {
      if (testArticles[0].keyword === testArticles[1].keyword) {
        setSavedKeywords(testArticles[0].keyword);
        return;
      }
      setSavedKeywords(`${testArticles[0].keyword} and ${testArticles[1].keyword}`);
      return;
    }
    if (testArticles.length === 3) {
      const keywordsArr = [];
      testArticles.forEach((article) => {
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
    if (testArticles.length > 3) {
      const keywordsArr = [];
      testArticles.forEach((article) => {
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
  }, []);
  return (
    <section className="saved-news-header">
      <h2 className="saved-news-header__title">Saved articles</h2>
      <p className="saved-news-header__subtitle">
        Elise, you have {testArticles.length} saved articles
      </p>
      <p className="saved-news-header__keywords">
        By keywords: <span className="saved-news-header__keywords_span">{savedKeywords}</span>
      </p>
    </section>
  );
}

export default SavedNewsHeader;
