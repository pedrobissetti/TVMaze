import { EVENTS_NAME, customEvent, IMAGE_PLACEHOLDER } from '@Helpers';

import CacheSelectors from './__cache-selectors';

const { popupDetail: { components, ...popupDetail } } = CacheSelectors;

const Methods = {
  init() {
    Methods.openPopup();
    Methods.closePopup();
  },

  openPopup() {
    document.addEventListener(EVENTS_NAME.APP_OPEN_POP_UP, ({ detail: { show } }) => {
      APP.selectedShow = show;
      APP.isModalOpened = true;
      Methods.fillPopupContent(show);
      document.body.classList.add('has--no-scroll');
      popupDetail.self.classList.add('is--opened');
    });
  },

  closePopup() {
    popupDetail.closeButton.addEventListener('click', (ev) => {
      ev.preventDefault();
      Methods.handleClosePopup();
    });

    popupDetail.self.addEventListener('click', (ev) => {
      if (ev.target === ev.currentTarget) {
        Methods.handleClosePopup();
      }
    });
  },

  handleClosePopup() {
    APP.isModalOpened = false;
    document.body.classList.remove('has--no-scroll');
    popupDetail.self.classList.remove('is--opened');
    customEvent(EVENTS_NAME.APP_CLOSE_POP_UP)
  },

  fillPopupContent(show) {
    components.image.setAttribute('src', show.image ? show.image.original : IMAGE_PLACEHOLDER);
    components.name.innerHTML = show.name;
    components.date.innerHTML = show.premiered.split('-').reverse().join('/');
    components.description.innerHTML = show.summary;
    components.genres.innerHTML = show.genres.map(genre => `<li class="show-pop-up__genre">${genre}</li>`).join('').replace(',', '');
  }
};

export default {
  init: Methods.init,
}