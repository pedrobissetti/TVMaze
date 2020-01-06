import InitialData from './_initial-data';
import ShowDetail from './_show-detail';
import PopupDetail from './_pop-details';
import Favorites from './_favorites';

const init = () => {
  Favorites.init();
  ShowDetail.init();
  PopupDetail.init();
  InitialData.init();
};

export default {
  init,
};