import { combineReducers } from 'redux';
import channelReducer from './channel_reducer';
import gamesReducer from './games_reducer';
import loadingReducer from './loading_reducer';

export default combineReducers({
  channel: channelReducer,
  games: gamesReducer,
  loadingState: loadingReducer
});
