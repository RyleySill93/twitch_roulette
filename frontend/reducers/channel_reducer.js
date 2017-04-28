import RECEIVE_CHANNEL from '../actions/channel_actions';

export default (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVE_CHANNEL':
      return action.channel;
    default:
      return state;
  }
};
