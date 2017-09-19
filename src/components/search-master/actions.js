import * as types from './constants';
import appConstants from '../../app.constants';
import apiProxy from '../../utils/api-proxy.service';
import logUtils from '../../utils/log-utils';

/**
 * This function update state information to start spinner
 */
export function startSpinner() {
  return function (dispatch) {
    dispatch({
      type: types.COMPONENTS_SEARCH_MASTER_SPINNER_START,
    });
  };
}

/**
 * This function update state information to stop spinner
 */
export function stopSpinner() {
  return function (dispatch) {
    dispatch({
      type: types.COMPONENTS_SEARCH_MASTER_SPINNER_STOP,
    });
  };
}

/**
 * This function retrieves information from API and update state
 */
export function load() {
  return function (dispatch) {
    startSpinner();
    apiProxy.get(appConstants.appInfo.apiServer + appConstants.apiRoutes.searchMastersRoute)
      .then((response) => {
        stopSpinner();
        dispatch({
          type: types.COMPONENTS_SEARCH_MASTER_LOAD_SUCCESS,
          data: response,
        });
      })
      .catch((e) => {
        stopSpinner();
        logUtils.logError('Error occured while loading masters', e);
      });
  };
}
