import RECEIVE_GAMES from '../actions/channel_actions';

export default (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVE_GAMES':
      return action.games;
    default:
      return state;
  }
};
