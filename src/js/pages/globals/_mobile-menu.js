const Methods = {
  init() {
    openMenu();
    closeMenu();
  },

  openMenu() {
    const mobileButton = document.querySelector('.js--mobile--button');
    const mobileMenu = document.querySelector('js--menu--container');
    mobileButton.addEventListener('click', () => {
      mobileButton.classList.add('active');
      mobileMenu.classList.add('active');
    });
  },

  closeMenu() {
    mobileButton.addEventListener('click', () => {
      mobileButton.classList.remove('active');
      mobileMenu.classList.remove('active');
    });
  }

};

export default {
  init: Methods.init,
};