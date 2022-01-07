import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './NewsCardList.css';
import testArticles from '../../assets/testArticles';
import NewsCard from '../NewsCard/NewsCard';
import Preloader from '../Preloader/Preloader';

function NewsCardList({
  loggedIn,
  isLoadingSearch,
  setIsSigninPopupOpen,
  homeRef,
  thunkDispatch,
  result,
}) {
  let loadingImages = [];
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isShowMoreVisible, setIsShowMoreVisible] = useState(testArticles.length > 3);
  const [cardAmount, setCardAmount] = useState(2);
  const handleShowMoreClick = () => {
    const bottomOverlay = document.querySelector('.news-card-list__button-overlay');
    bottomOverlay.classList.add('news-card-list__button-overlay_loading');
    setIsLoadingMore(true);
    setCardAmount(cardAmount + 3);
  };
  const handleArticleSave = (event) => {
    if (loggedIn) {
      const saveButton = event.target;
      saveButton.classList.toggle('news-card__save-button_active');
      return;
    }
    const checkHomeY = () => {
      const { y } = homeRef.current.getBoundingClientRect();
      if (y === 0) {
        setIsSigninPopupOpen(true);
      }
      return y;
    };
    const y = checkHomeY();
    if (y === 0) return;
    homeRef.current.scrollIntoView({
      behavior: 'smooth',
    });
    const handleAutoScroll = () => {
      const autoScrollY = checkHomeY();
      if (autoScrollY === 0) {
        window.removeEventListener('scroll', handleAutoScroll);
      }
    };
    window.addEventListener('scroll', handleAutoScroll);
  };
  const handleImageLoad = () => {
    const articlesLength = result.articles.length;
    loadingImages.push(true);
    let arrLength;
    const remainingArticles = articlesLength - cardAmount + 1;
    if (remainingArticles <= 2) {
      arrLength = remainingArticles + 1;
    }
    if (remainingArticles > 2) {
      arrLength = 3;
    }
    if (loadingImages.length === arrLength) {
      thunkDispatch({ type: 'IMAGES_LOADED' });
      if (isLoadingMore) {
        const bottomOverlay = document.querySelector('.news-card-list__button-overlay');
        bottomOverlay.classList.remove('news-card-list__button-overlay_loading');
        if (cardAmount + 1 >= articlesLength) setIsShowMoreVisible(false);
        setIsLoadingMore(false);
        loadingImages = [];
      }
    }
  };
  useEffect(() => {
    if (isLoadingSearch) {
      setIsShowMoreVisible(true);
      setCardAmount(2);
      loadingImages = [];
    }
  }, [isLoadingSearch]);
  return (
    <section className="news-card-list">
      <Preloader isLoading={isLoadingSearch}>
        <h2
          className={
            isLoadingSearch ? 'preloader__title' : 'preloader__title preloader__title_hidden'
          }
        >
          Searching for news...
        </h2>
      </Preloader>
      <h2
        className={
          isLoadingSearch
            ? 'news-card-list__title news-card-list__title_hidden'
            : 'news-card-list__title'
        }
      >
        Search results
      </h2>
      <ul
        className={
          isLoadingSearch
            ? 'news-card-list__grid news-card-list__grid_hidden'
            : 'news-card-list__grid'
        }
      >
        {result &&
          result.articles.map((article, index) =>
            index > cardAmount ? (
              ''
            ) : (
              <NewsCard
                article={article}
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                handleImageLoad={handleImageLoad}
              >
                <div
                  className="news-card__save-button"
                  onClick={handleArticleSave}
                  onKeyDown={() => {}}
                  role="button"
                  tabIndex={0}
                >
                  <div className="news-card__save-text">
                    {loggedIn ? 'Save this article' : 'Sign in to save articles'}
                  </div>
                </div>
              </NewsCard>
            )
          )}
      </ul>
      <div
        className={
          isShowMoreVisible
            ? 'news-card-list__button-overlay'
            : 'news-card-list__button-overlay news-card-list__button-overlay_hidden'
        }
      >
        <Preloader isLoading={isLoadingMore} />
        <button
          className={
            isLoadingMore || isLoadingSearch
              ? 'news-card-list__show-more-button news-card-list__show-more-button_hidden'
              : 'news-card-list__show-more-button'
          }
          type="button"
          onClick={handleShowMoreClick}
        >
          Show more
        </button>
      </div>
    </section>
  );
}

NewsCardList.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  isLoadingSearch: PropTypes.bool.isRequired,
  setIsSigninPopupOpen: PropTypes.func.isRequired,
  homeRef: PropTypes.instanceOf(Object).isRequired,
  thunkDispatch: PropTypes.func.isRequired,
  result: PropTypes.instanceOf(Object),
};

NewsCardList.defaultProps = {
  result: {},
};

export default NewsCardList;