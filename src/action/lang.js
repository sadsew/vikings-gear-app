export const UPDATE_LANG = 'UPDATE_LANG';

export const updateLang = (payload) => {
  return dispatch => {
    return dispatch({
      type: UPDATE_LANG,
      payload 
    });
  };
};
