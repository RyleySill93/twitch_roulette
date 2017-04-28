export const RECEIVE_CHANNEL = 'RECEIVE_CHANNEL';
export const RECEIVE_TOP_GAMES = 'RECEIVE_TOP_GAMES';
import { fetchChannels, fetchTopGames } from '../util/channel_api_util';

export const receiveChannel = (channel) => ({
  type: RECEIVE_CHANNEL,
  channel
});

export const receiveTopGames = (games) => ({
  type: RECEIVE_TOP_GAMES,
  games
});

export const requestChannels = () => dispatch => (
  fetchChannels().then(channels =>
    dispatch(receiveChannel(channels.data.streams[Math.floor(Math.random() * 10)].channel)))
);

export const requestTopGames = () => dispatch => (
  fetchTopGames().then(games =>
    dispatch(receiveTopGames(games.data.top)))
);
