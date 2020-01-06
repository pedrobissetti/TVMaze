import { EVENTS_NAME, customEvent } from '@Helpers';

const Methods = {
  init() {
    Methods.addLinkAction();
  },
  addLinkAction() {
    document.addEventListener(EVENTS_NAME.APP_LIST_SUCCESS, () => {
      const showDetailLink = document.querySelectorAll('.js--show-details');
      [...showDetailLink].map((link) => {
        link.addEventListener('click', Methods.showItemDetail);
      });
    });
  },
  showItemDetail(ev) {
    ev.preventDefault();
    const { showId } = ev.currentTarget.dataset;
    const [currentShow] = APP.cachedData.filter(({ show }) => show.id === +showId);
    const { show } = currentShow;
    customEvent(EVENTS_NAME.APP_OPEN_POP_UP, { show });
  },
};

export default {
  init: Methods.init,
}