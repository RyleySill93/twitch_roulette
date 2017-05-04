export const RECEIVE_STATE = 'RECEIVE_STATE';

export const receiveLoadingState = (loadingState) => ({
  type: RECEIVE_STATE,
  loadingState
});
