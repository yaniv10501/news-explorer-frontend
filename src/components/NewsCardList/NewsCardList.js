import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewsCardList.css';
import testArticles from '../../assets/testArticles';
import NewsCard from '../NewsCard/NewsCard';
import Preloader from '../Preloader/Preloader';

function NewsCardList({ loggedIn, isLoadingSearch, setIsSigninPopupOpen, homeRef }) {
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isShowMoreVisible, setIsShowMoreVisible] = useState(testArticles.length > 3);
  const [cardAmount, setCardAmount] = useState(2);
  const handleShowMoreClick = () => {
    setIsLoadingMore(true);
    // SetTimeout is used to fake loading time.
    setTimeout(() => {
      setIsLoadingMore(false);
      setCardAmount(cardAmount + 3);
      if (cardAmount + 4 >= testArticles.length) setIsShowMoreVisible(false);
    }, 1200);
  };
  const handleArticleSave = (event) => {
    if (loggedIn) {
      const saveButton = event.target;
      saveButton.classList.toggle('news-card__save-button_active');
      return;
    }
    homeRef.current.scrollIntoView({
      behavior: 'smooth',
    });
    const checkHomeY = () => {
      const { y } = homeRef.current.getBoundingClientRect();
      if (y === 0) {
        setIsSigninPopupOpen(true);
        window.removeEventListener('scroll', checkHomeY);
      }
    };
    window.addEventListener('scroll', checkHomeY);
  };
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
        {testArticles.map((article, index) =>
          index > cardAmount ? (
            ''
          ) : (
            // eslint-disable-next-line react/no-array-index-key
            <NewsCard article={article} key={index}>
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
};

export default NewsCardList;
