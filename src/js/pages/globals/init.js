import InitialData from './_initial-data';
import ShowDetail from './_show-detail';
import PopupDetail from './_pop-details';
import Favorites from './_favorites';

import outsideClick from './_outsideclick';


const init = () => {
  Favorites.init();
  ShowDetail.init();
  PopupDetail.init();
  InitialData.init();
};

export default {
  init,
};

function initMenuMobile() {
  const mobileButton = document.querySelector('.js--mobile--button');
  const mobileMenu = document.querySelector('.js--menu--container');
  const activeClass = 'active';
  const eventos = ['click', 'touchstart'];

  if (mobileButton) {
    function openMenu(event) {
      mobileButton.classList.add('active');
      mobileMenu.classList.add('active');
      outsideClick(mobileMenu, eventos, () => {
        mobileMenu.classList.remove('active');
        mobileButton.classList.remove('active');
      })
    }

    eventos.forEach(evento => {
      mobileButton.addEventListener(evento, openMenu);
    });
  }
}

initMenuMobile();