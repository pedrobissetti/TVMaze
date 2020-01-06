export default {
  list: {
    container: document.querySelector('.js--list-container'),
  },
  favoritesAmount: document.querySelector('.js--favorites-amount'),
  popupDetail: {
    self: document.querySelector('.js--show-pop-up'),
    closeButton: document.querySelector('.js--show-pop-up-close'),
    components: {
      image: document.querySelector('.js--show-pop-up-image'),
      name: document.querySelector('.js--show-pop-up-name'),
      genres: document.querySelector('.js--show-pop-up-genres'),
      description: document.querySelector('.js--show-pop-up-description'),
      date: document.querySelector('.js--show-pop-up-date'),
    }
  }
};