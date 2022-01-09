import newsBaseUrl from '../assets/newsBaseUrl';
import { useFetch } from './fetch';
import getSearchDates from './getSearchDates';
import { NEW_SEARCH, NOTHING_FOUND } from '../assets/reducerActions';

class NewsApi {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.from = getSearchDates.from;
    this.to = getSearchDates.to;
  }

  searchArticles = (dispatch, query) => {
    dispatch({ type: NEW_SEARCH, payload: { keyword: query } });
    useFetch(dispatch, `${this.baseUrl + query}&from=${this.from}&to=${this.to}`).then(
      (response) => {
        if (response.articles && response.articles.length === 0) {
          dispatch({ type: NOTHING_FOUND });
        }
        return response;
      }
    );
  };
}

const newsApi = new NewsApi(newsBaseUrl);

export default newsApi;
