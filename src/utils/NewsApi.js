import newsBaseUrl from '../assets/newsBaseUrl';
import { useFetch } from './fetch';
import getSearchDates from './getSearchDates';

class NewsApi {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.from = getSearchDates.from;
    this.to = getSearchDates.to;
  }

  searchArticles = (dispatch, query) =>
    useFetch(dispatch, `${this.baseUrl + query}&from=${this.from}&to=${this.to}`).then(
      (response) => {
        if (response.articles && response.articles.length === 0) {
          dispatch({ type: 'ERROR', payload: { error: new Error('NOTHING_FOUND') } });
        }
        return response;
      }
    );
}

const newsApi = new NewsApi(newsBaseUrl);

export default newsApi;
