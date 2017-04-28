import { combineReducers } from 'redux';
import channelReducer from './channel_reducer';
import gamesReducer from './games_reducer';

export default combineReducers({
  channel: channelReducer,
  games: gamesReducer
});
