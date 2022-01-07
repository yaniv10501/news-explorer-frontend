import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../NewsCardList/NewsCardList.css';
import testArticles from '../../assets/testArticles';
import mainApi from '../../utils/MainApi';
import NewsCard from '../NewsCard/NewsCard';
import Preloader from '../Preloader/Preloader';
import handleImageLoad from '../../utils/handleImageLoad';

function SavedCardList({ result, thunkDispatch }) {
  let loadingImages = [];
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isShowMoreVisible, setIsShowMoreVisible] = useState(testArticles.length > 3);
  const [cardAmount, setCardAmount] = useState(0);
  const handleShowMoreClick = () => {
    setIsLoadingMore(true);
    // SetTimeout is used to fake loading time.
    setTimeout(() => {
      setIsLoadingMore(false);
      setCardAmount(cardAmount + 3);
      if (cardAmount + 4 >= testArticles.length) setIsShowMoreVisible(false);
    }, 1200);
  };
  const handleDeleteClick = (event) => {
    mainApi.deleteArticle(thunkDispatch, event.target.id);
  };
  const handleImageLoading = () => {
    loadingImages = handleImageLoad(
      result.length,
      loadingImages,
      thunkDispatch,
      isLoadingMore,
      setIsLoadingMore,
      setIsShowMoreVisible,
      cardAmount,
      5
    );
  };
  useEffect(() => {
    setCardAmount(result.length);
  }, [result]);
  return (
    <section className="news-card-list">
      <ul className="news-card-list__grid">
        {result &&
          result.length > 0 &&
          result.map((article, index) =>
            index > cardAmount ? (
              ''
            ) : (
              // eslint-disable-next-line react/no-array-index-key
              <NewsCard article={article} key={index} handleImageLoad={handleImageLoading}>
                <div className="news-card__keyword">{article.keyword}</div>
                <div
                  className="news-card__delete-button"
                  id={article._id}
                  onClick={handleDeleteClick}
                  onKeyDown={() => {}}
                  role="button"
                  tabIndex={0}
                >
                  <div className="news-card__delete-text">Remove from saved</div>
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
            isLoadingMore
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

SavedCardList.propTypes = {
  result: PropTypes.instanceOf(Object),
  thunkDispatch: PropTypes.func.isRequired,
};

SavedCardList.defaultProps = {
  result: {},
};

export default SavedCardList;
