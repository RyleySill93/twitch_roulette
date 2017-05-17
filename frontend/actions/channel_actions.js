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

export const requestChannels = (game) => (dispatch) => {
  return fetchChannels(game).then(channels => {
    const streams = channels.data.streams;
    const size = streams.length - 1;
    const idx = Math.floor(Math.random() * size);
    return dispatch(receiveChannel(streams[idx].channel));
  });
};

export const requestTopGames = () => (dispatch) => (
  fetchTopGames().then(games =>
    dispatch(receiveGames(games.data.top.map(top => top.game))))
);

export const requestSearchedGames = (searchTerm) => (dispatch) => (
  fetchGames(searchTerm).then(games =>
    dispatch(receiveGames(games.data.games)))
    .catch(res => console.log('failed:', res))
);
