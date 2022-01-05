import React from 'react';
import PropTypes from 'prop-types';
import './NothingFound.css';
import nothingFound from '../../images/nothing-found.svg';
import Preloader from '../Preloader/Preloader';

function NothingFound({ isLoadingSearch }) {
  return (
    <section className="nothing-found">
      <Preloader isLoading={isLoadingSearch} />
      <div
        className={
          isLoadingSearch
            ? 'nothing-found__container nothing-found__container_hidden'
            : 'nothing-found__container'
        }
      >
        <img className="nothing-found__image" src={nothingFound} alt="Nothing found icon" />
        <h2 className="nothing-found__title">Nothing found</h2>
        <p className="nothing-found__text">Sorry, but nothing matched your search terms.</p>
      </div>
    </section>
  );
}

NothingFound.propTypes = {
  isLoadingSearch: PropTypes.bool.isRequired,
};

export default NothingFound;
