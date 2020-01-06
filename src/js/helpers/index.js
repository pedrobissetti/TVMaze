export const API_ENDPOINT = '//api.tvmaze.com';

export const IMAGE_PLACEHOLDER = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII=';

export const EVENTS_NAME = {
  APP_INITIAL_FETCH_STARTED: 'APP_INITIAL_FETCH_STARTED',
  APP_INITIAL_FETCH_SUCCESS: 'APP_INITIAL_FETCH_SUCCESS',
  APP_INITIAL_FETCH_FAILURE: 'APP_INITIAL_FETCH_FAILURE',
  APP_LIST_STARTED: 'APP_LIST_STARTED',
  APP_LIST_SUCCESS: 'APP_LIST_SUCCESS',
  APP_LIST_FAILURE: 'APP_LIST_FAILURE',
  APP_OPEN_POP_UP: 'APP_OPEN_POP_UP',
  APP_CLOSE_POP_UP: 'APP_CLOSE_POP_UP',
  APP_REQUEST_FAVORITE_CHANGE: 'APP_REQUEST_FAVORITE_CHANGE',
  APP_REQUEST_FAVORITE_SUCCESS: 'APP_REQUEST_FAVORITE_SUCCESS',
  APP_REQUEST_FAVORITE_FINISHED: 'APP_REQUEST_FAVORITE_FINISHED',
}

export const customEvent = (eventName, data = {}) => {
  const newEvent = new CustomEvent(eventName, { detail: { ...data } })
  document.dispatchEvent(newEvent);
};

export const getCurrentMarkup = (arrayList) => arrayList.map(({ show: { id, name, genres, image } }) => `
<article class="show-detail">
  <button class="show-detail__favorite js--show-favorite" title="${APP.favorites.indexOf(id) > -1 ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}" type="button">
    ${APP.favorites.indexOf(id) > -1 ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
  </button>
  <a class="show-detail__link js--show-details" title="${name}" href="#" data-show-id="${id}">
    <section class="show-detail__wrapper">
      <figure class="show-detail__poster">
        <img src="${image ? image.original : IMAGE_PLACEHOLDER}" alt="${name}" title="${name}" />
      </figure>
      <div class="show-detail__information">
        <h2 class="show-detail__name">${name}</h2>
        ${genres && `<p class="show-detail__genres">${genres.join(',')}</p>`}
      </div>
    </section>
  </a>
</article>
`);