import { UPDATE_GEAR } from '../action/lang';

const initialState = {};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_GEAR: {
      return {
        ...state,
        payload
      };
    }
    default:
      return state;
  }
};
