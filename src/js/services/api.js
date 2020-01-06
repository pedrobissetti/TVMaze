import { stringify } from 'query-string';
import { API_ENDPOINT } from '../helpers';

export const getData = async (options = {}, type = 'search', location = 'shows') => {
  const queryString = stringify(options);

  if (!queryString) return false;

  return await (await fetch(`${API_ENDPOINT}/${type}/${location}/?${queryString}`)).json();
}