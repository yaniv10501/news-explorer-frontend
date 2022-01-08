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

  getUserMe = (dispatch) =>
    useFetch(
      dispatch,
      `${this.baseUrl}/users/me`,
      {
        credentials: 'include',
      },
      { auth: true }
    ).then((response) => response);

  getSavedArticles = (dispatch) =>
    useFetch(dispatch, `${this.baseUrl}/articles`, {
      credentials: 'include',
    }).then((response) => response);

  checkSavedArticles = (dispatch, articles) =>
    useFetch(
      dispatch,
      `${this.baseUrl}/articles/checkSaved`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ articles }),
      },
      { silent: true }
    ).then((response) => console.log(response));

  saveArticle = (dispatch, article, keyword, saveButton) => {
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
      { silent: true }
    ).then((response) => {
      console.log(response);
      if (response instanceof Error) {
        return;
      }
      const saveButtonElement = saveButton;
      saveButtonElement.classList.add('news-card__save-button_active');
      saveButtonElement.id = response.article.id;
    });
  };

  deleteArticle = (dispatch, articleId, { saveButton, articles, setArticles }) =>
    useFetch(
      dispatch,
      `${this.baseUrl}/articles/${articleId}`,
      {
        method: 'DELETE',
        credentials: 'include',
      },
      { silent: true }
    ).then((response) => {
      console.log(response);
      if (response instanceof Error) {
        return;
      }
      if (saveButton) {
        const saveButtonElement = saveButton;
        saveButtonElement.classList.remove('news-card__save-button_active');
        saveButtonElement.id = '';
      }
      if (articles && setArticles) {
        setArticles(articles.filter((article) => article._id !== articleId));
      }
    });
}

const mainApi = new MainApi(backEndApi);

export default mainApi;
