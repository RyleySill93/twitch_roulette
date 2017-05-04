import RECEIVE_STATE from '../actions/loading_actions';

export default (state = '', action) => {
  switch (action.type) {
    case 'RECEIVE_STATE':
      return action.loadingState;
    default:
      return state;
  }
};
