import backEndApi from '../assets/backEndApi';
import { useFetch } from './fetch';

class MainApi {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  signIn = (dispatch, email, password) =>
    useFetch(dispatch, `${this.baseUrl}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((response) => {
      console.log(response);
      return response;
    });

  getSavedArticles = (dispatch) =>
    useFetch(dispatch, `${this.baseUrl}/articles`, {
      credentials: 'include',
    }).then((response) => console.log(response));

  saveArticle = (dispatch, article, keyword) => {
    const {
      source: { name: source },
      title,
      description: text,
      publishedAt: date,
      url: link,
      urlToImage: image,
    } = article;
    useFetch(
      dispatch,
      `${this.baseUrl}/articles`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source,
          title,
          text,
          date,
          link,
          image,
          keyword,
        }),
      },
      true
    ).then((response) => console.log(response));
  };

  deleteArticle = (dispatch, articleId) =>
    useFetch(dispatch, `${this.baseUrl}/articles/${articleId}`, {
      method: 'DELETE',
      credentials: 'include',
    }).then((response) => console.log(response));
}

const mainApi = new MainApi(backEndApi);

export default mainApi;
