import { getData } from '@Services/api';
import { customEvent, IMAGE_PLACEHOLDER, EVENTS_NAME, getCurrentMarkup } from '@Helpers';
import CacheSelectors from './__cache-selectors';

const { list, favoritesAmount } = CacheSelectors;
const Methods = {
  init() {
    Methods.loadInitialData();
    Methods.initialData();
  },
  async initialData() {
    customEvent(EVENTS_NAME.APP_INITIAL_FETCH_STARTED);
    const cachedData = localStorage.getItem('cachedData');

    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      APP.cachedData = parsedData.data;
      APP.favorites = parsedData.favorites
      APP.favoritesAmount = APP.favorites.length;
      customEvent(EVENTS_NAME.APP_INITIAL_FETCH_SUCCESS);
      return true;
    }

    try {
      const data = await getData({ q: 'girls' });
      localStorage.setItem('cachedData', JSON.stringify({ data, favorites: [] }));
      APP.cachedData = data;
      APP.favorites = [];
      customEvent(EVENTS_NAME.APP_INITIAL_FETCH_SUCCESS);
    } catch (err) {
      customEvent(EVENTS_NAME.APP_INITIAL_FETCH_FAILURE, { error: err });
    }
  },

  loadInitialData() {
    document.addEventListener(EVENTS_NAME.APP_INITIAL_FETCH_SUCCESS, () => {
      const listTemplate = getCurrentMarkup(APP.cachedData);
      list.container.innerHTML = listTemplate.join('');
      favoritesAmount.innerHTML = `(${APP.favoritesAmount})`;
      customEvent(EVENTS_NAME.APP_LIST_SUCCESS);
    });
  }

}

export default {
  init: Methods.init,
};