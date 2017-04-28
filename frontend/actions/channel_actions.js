export const RECEIVE_CHANNEL = 'RECEIVE_CHANNEL';
import { fetchChannels } from '../util/channel_api_util';

export const receiveChannel = (channel) => ({
  type: RECEIVE_CHANNEL,
  channel
});

export const requestChannels = () => dispatch => (
  fetchChannels().then(channels =>
    dispatch(receiveChannel(channels.data.streams[Math.floor(Math.random() * 10)].channel.name)))
);
