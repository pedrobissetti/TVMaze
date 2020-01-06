import { EVENTS_NAME, customEvent, getCurrentMarkup } from '@Helpers';
import CacheSelectors from './__cache-selectors';

const { favoritesAmount } = CacheSelectors;

const Methods = {
  init() {
    Methods.favoritesAction();
    Methods.validateFavoriteRequest();
    Methods.updateFavoriteList();
    Methods.updateFavoritesHeader();
  },

  favoritesAction() {
    document.addEventListener(EVENTS_NAME.APP_LIST_SUCCESS, () => {
      const favoritesButton = document.querySelectorAll('.js--show-favorite');
      [...favoritesButton].map((favorite, index) => {
        favorite.addEventListener('click', (ev) => Methods.dispatchFavoriteAction(ev, index));
      });
    });
  },

  dispatchFavoriteAction(ev, index) {
    ev.preventDefault();
    const { showId } = ev.currentTarget.nextElementSibling.dataset;

    customEvent(EVENTS_NAME.APP_REQUEST_FAVORITE_CHANGE, { showId, i: index })
  },

  validateFavoriteRequest() {
    document.addEventListener(EVENTS_NAME.APP_REQUEST_FAVORITE_CHANGE, ({ detail: { showId, i } }) => {
      const currentList = Methods.getCurrentList();
      let updatedList = [];

      const favoritesButton = document.querySelectorAll('.js--show-favorite');

      currentList.indexOf(+showId) === -1 ?
        updatedList = [...currentList, +showId]
        : updatedList = currentList.filter(id => id !== +showId);

      favoritesButton[i].innerHTML = currentList.length < updatedList.length ?
        'Remover dos Favoritos' : 'Adicionar aos Favoritos';

      customEvent(EVENTS_NAME.APP_REQUEST_FAVORITE_SUCCESS, { newList: updatedList });
    });
  },

  updateFavoriteList() {
    document.addEventListener(EVENTS_NAME.APP_REQUEST_FAVORITE_SUCCESS, ({ detail: { newList } }) => {
      APP.favoritesAmount = newList.length;
      APP.favorites = newList;
      const cachedData = JSON.parse(localStorage.getItem('cachedData'));
      cachedData.favorites = newList;
      localStorage.setItem('cachedData', JSON.stringify(cachedData));
      customEvent(EVENTS_NAME.APP_REQUEST_FAVORITE_FINISHED);
    });
  },

  updateFavoritesHeader() {
    document.addEventListener(EVENTS_NAME.APP_REQUEST_FAVORITE_FINISHED, ({ detail: { newList } }) => {
      favoritesAmount.innerHTML = `(${APP.favoritesAmount})`;
    });
  },

  getCurrentList() {
    return JSON.parse(localStorage.getItem('cachedData')).favorites || [];
  }
};

export default {
  init: Methods.init,
};