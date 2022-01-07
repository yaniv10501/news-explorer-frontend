import React, { useEffect, useState } from 'react';
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
  homeRef,
  headerRef,
  setCurrentUser,
}) {
  const [searchActive, setSearchActive] = useState(false);
  const [state, thunkDispatch] = useThunkReducer(fetchReducer, initialState);
  const { result, loading, silentLoading, isNothingFound, error } = state;
  useEffect(() => {
    setIsHome(true);

    return () => setIsHome(false);
  }, []);
  return (
    <>
      <main className="home" ref={homeRef}>
        <SearchForm setSearchActive={setSearchActive} thunkDispatch={thunkDispatch} />
        {searchActive &&
          (isNothingFound && !result ? (
            <NothingFound isLoadingSearch={loading} />
          ) : (
            <NewsCardList
              loggedIn={loggedIn}
              isLoadingSearch={loading}
              silentLoading={silentLoading}
              setIsSigninPopupOpen={setIsSigninPopupOpen}
              homeRef={homeRef}
              thunkDispatch={thunkDispatch}
              result={result}
              error={error}
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
        thunkDispatch={thunkDispatch}
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
  homeRef: PropTypes.instanceOf(Object).isRequired,
  headerRef: PropTypes.instanceOf(Object).isRequired,
  setCurrentUser: PropTypes.func.isRequired,
};

export default Home;
