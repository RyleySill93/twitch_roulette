import axios from 'axios';

export const fetchChannels = (channel) => (
  axios({
    method: 'get',
    url: 'https://api.twitch.tv/kraken/search/streams?query=starcraft',
    headers: {'Client-ID': 'wxk4qnqg3ajyzh9p2u1dx398ehud5f'}
  })
);

export const fetchTopGames = (channel) => (
  axios({
    method: 'get',
    url: 'https://api.twitch.tv/kraken/games/top',
    headers: {'Client-ID': 'wxk4qnqg3ajyzh9p2u1dx398ehud5f'}
  })
);
