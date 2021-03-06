import * as types from './constants';
import initialState from './initial.state';

/**
 * Reducer which is reponsible to update state
 * @param {object} state - existing state information
 * @param {object} action - new state information 
 */
export default function addMasterReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.COMPONENTS_ADD_MASTER_SPINNER_START:
      return {
        ...state,
        loading: true,
      };
    case types.COMPONENTS_ADD_MASTER_SPINNER_STOP:
      return {
        ...state,
        loading: false,
      };
    case types.COMPONENTS_ADD_MASTER_ACTION_SUCCESS:
      return {
        ...state,
        isSubmitted: action.isSubmitted,
      };
    case types.COMPONENTS_ADD_MASTER_ACTION_LOAD_ITEM:
      return {
        ...state,
        isSubmitted: action.isSubmitted,
        data: action.data,
      };
    case types.COMPONENTS_ADD_MASTER_ACTION_RESET:
      return {
        ...state,
        isSubmitted: action.isSubmitted,
        data: action.data,
      };
    case types.COMPONENTS_ADD_MASTER_ACTION_FAILED:
      return {
        ...state,
        isSubmitted: action.isSubmitted,
      };
    default:
      return state;
  }
}
