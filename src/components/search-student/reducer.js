import * as types from './constants';
import initialState from './initial.state';

/**
 * Reducer which is reponsible to update state
 * @param {object} state - existing state information
 * @param {object} action - new state information 
 */
export default function searchStudentReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.COMPONENTS_SEARCH_STUDENT_RESET_STATE:
      return {};
    case types.COMPONENTS_SEARCH_STUDENT_SPINNER_START:
      return {
        ...state,
        loading: true,
      };
    case types.COMPONENTS_SEARCH_STUDENT_SPINNER_STOP:
      return {
        ...state,
        loading: false,
      };
    case types.COMPONENTS_SEARCH_STUDENT_LOAD_SUCCESS:
      return {
        ...state,
        data: action.data,
      };
    default:
      return state;
  }
}
