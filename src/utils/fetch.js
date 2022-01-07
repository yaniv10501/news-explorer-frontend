import { useReducer } from 'react';
import isFunction from 'lodash/isFunction';

const initialState = {
  keyword: null,
  result: null,
  loading: false,
  silentLoading: false,
  isNothingFound: false,
  error: null,
};

const initialPageState = {
  result: null,
  loading: true,
  imagesLoading: true,
  fontsLoading: true,
  silentLoading: false,
  isNothingFound: false,
  error: null,
};

const useThunkReducer = (reducer, initState) => {
  const [state, dispatch] = useReducer(reducer, initState);

  const thunkDispatch = (action) => {
    if (isFunction(action)) {
      action(dispatch);
    } else {
      dispatch(action);
    }
  };

  return [state, thunkDispatch];
};

const fetchReducer = (state, action) => {
  if (action.type === 'NEW_SEARCH') {
    return {
      keyword: action.payload.keyword,
      result: null,
      loading: true,
      silentLoading: false,
      isNothingFound: false,
      error: null,
    };
  }
  if (action.type === 'LOADING') {
    return {
      ...state,
      result: null,
      loading: true,
      silentLoading: false,
      isNothingFound: false,
      error: null,
    };
  }
  if (action.type === 'SILENT_LOADING') {
    return {
      ...state,
      result: null,
      loading: false,
      silentLoading: true,
      isNothingFound: false,
      error: null,
    };
  }
  if (action.type === 'RESPONSE') {
    return {
      ...state,
      result: action.payload.response,
      silentLoading: false,
    };
  }
  if (action.type === 'IMAGES_LOADED') {
    return {
      ...state,
      loading: false,
    };
  }
  if (action.type === 'PAGE_IMAGES_LOADED') {
    if (state.fontsLoading) {
      return {
        ...state,
        imagesLoading: false,
      };
    }
    return {
      ...state,
      imagesLoading: false,
      loading: false,
    };
  }
  if (action.type === 'FONTS_LOADED') {
    if (state.imagesLoading) {
      return {
        ...state,
        fontsLoading: false,
      };
    }
    return {
      ...state,
      fontsLoading: false,
      loading: false,
    };
  }
  if (action.type === 'NOTHING_FOUND') {
    return {
      ...state,
      result: null,
      loading: false,
      silentLoading: false,
      isNothingFound: true,
      error: null,
    };
  }
  if (action.type === 'ERROR') {
    return {
      ...state,
      result: null,
      loading: false,
      silentLoading: false,
      isNothingFound: false,
      error: action.payload.error,
    };
  }
  return state;
};

const useFetch = (dispatch, url, options, silent, auth) => {
  if (!silent) {
    dispatch({ type: 'LOADING' });
  }
  if (silent) {
    dispatch({ type: 'SILENT_LOADING' });
  }
  const fetchUrl = async () => {
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      dispatch({ type: 'RESPONSE', payload: { response: data } });
      return data;
    } catch (error) {
      if (auth) {
        return error;
      }
      dispatch({ type: 'ERROR', payload: { error } });
      return error;
    }
  };

  return fetchUrl();
};

const getArticles = (dispatch, url, options) =>
  useFetch(dispatch, url, options).then((response) => {
    if (response instanceof Error) {
      return response;
    }
    if (response.articles.length === 0) {
      dispatch({ type: 'ERROR', payload: { error: new Error('NOTHING_FOUND') } });
    }
    return response;
  });

const signIn = (dispatch, url, options) =>
  useFetch(dispatch, url, options).then((response) => console.log(response));

export {
  useThunkReducer,
  fetchReducer,
  initialState,
  initialPageState,
  getArticles,
  signIn,
  useFetch,
};
