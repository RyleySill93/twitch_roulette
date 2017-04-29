export const RECEIVE_CHANNEL = 'RECEIVE_CHANNEL';
export const RECEIVE_GAMES = 'RECEIVE_GAMES';
import { fetchChannels, fetchTopGames, fetchGames } from '../util/channel_api_util';

export const receiveChannel = (channel) => ({
  type: RECEIVE_CHANNEL,
  channel
});

export const receiveGames = (games) => ({
  type: RECEIVE_GAMES,
  games
});

export const requestChannels = game => dispatch => {
  return fetchChannels(game).then(channels => {
    const idx = Math.floor(Math.random() * (channels.data.streams.length - 1));
    console.log(idx);
    console.log(channels.data.streams);
    return dispatch(receiveChannel(channels.data.streams[idx].channel));
  });
};

export const requestTopGames = () => dispatch => (
  fetchTopGames().then(games =>
    dispatch(receiveGames(games.data.top)))
);

export const requestSearchedGames = (searchTerm) => dispatch => (
  fetchGames(searchTerm).then(games =>
    dispatch(receiveGames(games.data.games)))
    .catch(res => console.log('failed:', res))
);
