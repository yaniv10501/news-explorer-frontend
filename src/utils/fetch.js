import { useReducer } from 'react';
import isFunction from 'lodash/isFunction';

const initialState = {
  result: null,
  loading: false,
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
  if (action.type === 'LOADING') {
    return {
      result: null,
      loading: true,
      isNothingFound: false,
      error: null,
    };
  }
  if (action.type === 'RESPONSE') {
    return {
      result: action.payload.response,
      loading: true,
      isNothingFound: false,
      error: null,
    };
  }
  if (action.type === 'IMAGES_LOADED') {
    return {
      ...state,
      loading: false,
    };
  }
  if (action.type === 'NOTHING_FOUND') {
    return {
      result: null,
      loading: true,
      isNothingFound: true,
      error: null,
    };
  }
  if (action.type === 'ERROR') {
    return {
      result: null,
      loading: false,
      isNothingFound: false,
      error: action.payload.error,
    };
  }
  return state;
};

const useFetch = (dispatch, url, options) => {
  dispatch({ type: 'LOADING' });

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

export { useThunkReducer, fetchReducer, initialState, getArticles, signIn, useFetch };
