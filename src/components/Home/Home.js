import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Home.css';
import { useThunkReducer, fetchReducer, initialState } from '../../utils/fetch';
import SearchForm from '../SearchForm/SearchForm';
import NewsCardList from '../NewsCardList/NewsCardList';
import About from '../About/About';
import SigninPopup from '../SigninPopup/SigninPopup';
import SignupPopup from '../SignupPopup/SignupPopup';
import SuccessRegisterPopup from '../SuccessRegisterPopup/SuccessRegisterPopup';
import NothingFound from '../NothingFound/NothingFound';
import NotAuthorizedPopup from '../NotAuthorizedPopup/NotAuthorizedPopup';

function Home({
  loggedIn,
  setLoggedIn,
  setIsHome,
  closeAllPopups,
  isSigninPopupOpen,
  setIsSigninPopupOpen,
  isSignupPopupOpen,
  setIsSignupPopupOpen,
  isSuccessRegisterPopupOpen,
  setIsSuccessRegisterPopupOpen,
  isNotAuthorizedPopupOpen,
  homeRef,
  headerRef,
  setCurrentUser,
}) {
  const history = useHistory();
  const [searchActive, setSearchActive] = useState(false);
  const [state, thunkDispatch] = useThunkReducer(fetchReducer, initialState);
  const { keyword, result, loading, isNothingFound } = state;
  useEffect(() => {
    setIsHome(true);
    console.log(history, history.action);
    return () => setIsHome(false);
  }, []);
  return (
    <>
      <main className="home" ref={homeRef}>
        <SearchForm setSearchActive={setSearchActive} thunkDispatch={thunkDispatch} />
        {searchActive &&
          (isNothingFound ? (
            <NothingFound isLoadingSearch={loading} thunkDispatch={thunkDispatch} />
          ) : (
            <NewsCardList
              loggedIn={loggedIn}
              isLoadingSearch={loading}
              setIsSigninPopupOpen={setIsSigninPopupOpen}
              homeRef={homeRef}
              thunkDispatch={thunkDispatch}
              keyword={keyword}
              result={result}
            />
          ))}
        <About />
      </main>
      <SigninPopup
        closeAllPopups={closeAllPopups}
        isSigninPopupOpen={isSigninPopupOpen}
        setIsSignupPopupOpen={setIsSignupPopupOpen}
        setLoggedIn={setLoggedIn}
        headerRef={headerRef}
        setCurrentUser={setCurrentUser}
      />
      <SignupPopup
        closeAllPopups={closeAllPopups}
        isSignupPopupOpen={isSignupPopupOpen}
        setIsSigninPopupOpen={setIsSigninPopupOpen}
        setIsSuccessRegisterPopupOpen={setIsSuccessRegisterPopupOpen}
        headerRef={headerRef}
      />
      <SuccessRegisterPopup
        closeAllPopups={closeAllPopups}
        isSuccessRegisterPopupOpen={isSuccessRegisterPopupOpen}
        setIsSigninPopupOpen={setIsSigninPopupOpen}
        headerRef={headerRef}
      />
      <NotAuthorizedPopup
        closeAllPopups={closeAllPopups}
        isNotAuthorizedPopupOpen={isNotAuthorizedPopupOpen}
        setIsSigninPopupOpen={setIsSigninPopupOpen}
        headerRef={headerRef}
      />
    </>
  );
}

Home.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  setLoggedIn: PropTypes.func.isRequired,
  setIsHome: PropTypes.func.isRequired,
  closeAllPopups: PropTypes.func.isRequired,
  isSigninPopupOpen: PropTypes.bool.isRequired,
  setIsSigninPopupOpen: PropTypes.func.isRequired,
  isSignupPopupOpen: PropTypes.bool.isRequired,
  setIsSignupPopupOpen: PropTypes.func.isRequired,
  isSuccessRegisterPopupOpen: PropTypes.bool.isRequired,
  setIsSuccessRegisterPopupOpen: PropTypes.func.isRequired,
  isNotAuthorizedPopupOpen: PropTypes.bool.isRequired,
  homeRef: PropTypes.instanceOf(Object).isRequired,
  headerRef: PropTypes.instanceOf(Object).isRequired,
  setCurrentUser: PropTypes.func.isRequired,
};

export default Home;
