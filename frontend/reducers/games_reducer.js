import RECEIVE_TOP_GAMES from '../actions/channel_actions';

export default (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVE_TOP_GAMES':
      return action.games;
    default:
      return state;
  }
};
