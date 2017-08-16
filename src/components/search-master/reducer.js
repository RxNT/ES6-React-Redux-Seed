import * as types from './constants';
import initialState from './initial.state';

export default function searchMasterReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.COMPONENTS_SEARCH_MASTER_SPINNER_START:
      return {
        ...state,
        loading: true,
      };
    case types.COMPONENTS_SEARCH_MASTER_SPINNER_STOP:
      return {
        ...state,
        loading: false,
      };
    case types.COMPONENTS_SEARCH_MASTER_LOAD_SUCCESS:
      return {
        ...state,
        data: action.data,
      };
    default:
      return state;
  }
}