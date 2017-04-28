import { combineReducers } from 'redux';
import channelReducer from './channel_reducer';

export default combineReducers({
  channel: channelReducer
});
