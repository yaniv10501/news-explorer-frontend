import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import escape from 'escape-html';
import './SearchForm.css';
import newsApi from '../../utils/NewsApi';

function SearchForm({ setSearchActive, thunkDispatch }) {
  const [searchValue, setSearchValue] = useState('');
  const handleSearchChange = (event) => {
    const { value } = event.target;
    const escapedValue = escape(value);
    setSearchValue(escapedValue);
  };
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setSearchActive(true);
    thunkDispatch({ type: 'NEW_SEARCH', payload: { keyword: searchValue } });
    thunkDispatch((dispatch) => newsApi.searchArticles(dispatch, searchValue));
  };
  useEffect(() => {}, []);
  return (
    <section className="search">
      <form className="search__form" noValidate onSubmit={handleSearchSubmit}>
        <h1 className="search__form-title">What&apos;s going on in the world?</h1>
        <p className="search__form-subtitle">
          Find the latest news on any topic and save them in your personal account.
        </p>
        <div className="search__form-search-container">
          <input
            className="search__form-input"
            type="text"
            placeholder="Enter topic"
            value={searchValue}
            onChange={handleSearchChange}
          />
          <button className="search__form-submit-button" type="submit">
            Search
          </button>
        </div>
      </form>
    </section>
  );
}

SearchForm.propTypes = {
  setSearchActive: PropTypes.func.isRequired,
  thunkDispatch: PropTypes.func.isRequired,
};

export default SearchForm;
