/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import './SavedNews.css';
import { fetchReducer, initialState, useThunkReducer } from '../../utils/fetch';
import Preloader from '../Preloader/Preloader';
import SavedCardList from '../SavedCardList/SavedCardList';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import mainApi from '../../utils/MainApi';

function SavedNews({ setIsHome }) {
  const [state, thunkDispatch] = useThunkReducer(fetchReducer, initialState);
  const { result, loading, silentLoading, isNothingFound, error } = state;
  useEffect(() => {
    setIsHome(false);
    mainApi.getSavedArticles(thunkDispatch);
    return () => setIsHome(true);
  }, []);
  useEffect(() => {
    console.log(loading);
  }, [loading]);
  return (
    <>
      <Preloader isLoading={loading} />
      <main className={loading ? 'saved-news saved-news_hidden' : 'saved-news'}>
        <SavedNewsHeader />
        <SavedCardList result={result} thunkDispatch={thunkDispatch}>
          <div className="news-card__keyword">{}</div>
        </SavedCardList>
      </main>
    </>
  );
}

SavedNews.propTypes = {
  setIsHome: PropTypes.func.isRequired,
};

export default SavedNews;
