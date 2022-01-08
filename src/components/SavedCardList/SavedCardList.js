import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../NewsCardList/NewsCardList.css';
import mainApi from '../../utils/MainApi';
import NewsCard from '../NewsCard/NewsCard';
import Preloader from '../Preloader/Preloader';
import handleImageLoad from '../../utils/handleImageLoad';
import handleShowMore from '../../utils/handleShowMore';

function SavedCardList({ result, thunkDispatch, articles, setArticles }) {
  let loadingImages = [];
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isShowMoreVisible, setIsShowMoreVisible] = useState(false);
  const [cardAmount, setCardAmount] = useState(5);
  const handleShowMoreClick = () => handleShowMore(setIsLoadingMore, setCardAmount, cardAmount);
  const handleDeleteClick = (event) => {
    mainApi.deleteArticle(thunkDispatch, event.target.id, { articles, setArticles });
  };
  const handleImageLoading = () => {
    loadingImages = handleImageLoad(
      articles.length,
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
    if (result && !result.message) {
      setArticles(result);
      if (result.length > 6) {
        setIsShowMoreVisible(true);
      }
    }
  }, [result]);
  return (
    <section className="news-card-list">
      <ul className="news-card-list__grid">
        {articles &&
          articles.length > 0 &&
          articles.map((article, index) =>
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
  articles: PropTypes.instanceOf(Object).isRequired,
  setArticles: PropTypes.func.isRequired,
};

SavedCardList.defaultProps = {
  result: [],
};

export default SavedCardList;
