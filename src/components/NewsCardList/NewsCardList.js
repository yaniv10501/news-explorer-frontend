import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard';
import Preloader from '../Preloader/Preloader';
import mainApi from '../../utils/MainApi';
import handleImageLoad from '../../utils/handleImageLoad';
import handleShowMore from '../../utils/handleShowMore';

function NewsCardList({
  loggedIn,
  isLoadingSearch,
  setIsSigninPopupOpen,
  homeRef,
  thunkDispatch,
  keyword,
  result,
}) {
  let loadingImages = [];
  const newsCardListButtonOverlayRef = useRef();
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [articles, setArticles] = useState([]);
  const [isShowMoreVisible, setIsShowMoreVisible] = useState(true);
  const [cardAmount, setCardAmount] = useState(2);
  const handleShowMoreClick = () =>
    handleShowMore(newsCardListButtonOverlayRef, setIsLoadingMore, setCardAmount, cardAmount);
  const handleArticleSave = (event, article) => {
    if (loggedIn) {
      const saveButton = event.target;
      if (saveButton.classList.contains('news-card__save-button_active')) {
        mainApi.deleteArticle(thunkDispatch, saveButton.id, { saveButton });
      } else {
        mainApi.saveArticle(thunkDispatch, article, keyword, saveButton);
      }
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
  const handleImageLoading = () => {
    loadingImages = handleImageLoad(
      newsCardListButtonOverlayRef,
      articles.length,
      loadingImages,
      thunkDispatch,
      isLoadingMore,
      setIsLoadingMore,
      setIsShowMoreVisible,
      cardAmount,
      2
    );
  };
  useEffect(() => {
    if (isLoadingSearch) {
      if (articles.length > 0) {
        setArticles([]);
        setCardAmount(2);
        loadingImages = [];
      }
      if (result && result.articles) {
        if (result.articles.length === 0) return;
        if (loggedIn) {
          mainApi.checkSavedArticles(thunkDispatch, result.articles, false).then((response) => {
            if (response.checkedArticles) {
              const { checkedArticles } = response;
              setArticles(checkedArticles);
              if (checkedArticles.length <= 3) {
                setIsShowMoreVisible(false);
              }
            }
          });
        } else {
          setArticles(result.articles);
        }
      }
    }
  }, [isLoadingSearch, result]);
  useEffect(() => {
    if (loggedIn && articles.length > 0) {
      mainApi.checkSavedArticles(thunkDispatch, articles, true).then((response) => {
        if (response.checkedArticles) {
          const { checkedArticles } = response;
          setArticles(checkedArticles);
        }
      });
    }
    if (!loggedIn && articles.length > 0) {
      setArticles(
        articles.map((item) => {
          const articleItem = item;
          articleItem._id = '';
          return articleItem;
        })
      );
    }
  }, [loggedIn]);
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
        {articles.length > 0 &&
          articles.map((article, index) =>
            index > cardAmount ? (
              ''
            ) : (
              <NewsCard
                article={article}
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                handleImageLoad={handleImageLoading}
              >
                <div
                  className={
                    article._id
                      ? 'news-card__save-button news-card__save-button_active'
                      : 'news-card__save-button'
                  }
                  id={article._id || ''}
                  onClick={(event) => handleArticleSave(event, article)}
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
        ref={newsCardListButtonOverlayRef}
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
  keyword: PropTypes.string.isRequired,
  result: PropTypes.instanceOf(Object),
};

NewsCardList.defaultProps = {
  result: {},
};

export default NewsCardList;
