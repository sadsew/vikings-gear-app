import { UPDATE_LANG } from '../action/lang';

const initialState = localStorage.getItem('lang') || 'ru';

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_LANG: {
      localStorage.setItem('lang', payload);
      return payload;
    }
    default:
      return state;
  }
};
