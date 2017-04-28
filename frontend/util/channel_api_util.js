import axios from 'axios';

export const fetchChannels = game => (
  axios({
    method: 'get',
    url: `https://api.twitch.tv/kraken/search/streams?&limit=10&query=${game.toLowerCase().split(" ").join("-")}`,
    headers: {'Client-ID': 'wxk4qnqg3ajyzh9p2u1dx398ehud5f'}
  })
);

export const fetchTopGames = () => (
  axios({
    method: 'get',
    url: 'https://api.twitch.tv/kraken/games/top/?limit=25',
    headers: {'Client-ID': 'wxk4qnqg3ajyzh9p2u1dx398ehud5f'}
  })
);

export const fetchGames = (searchTerm) => (
  axios({
    method: 'get',
    url: `https://api.twitch.tv/kraken/search/games?query=star`,
    headers: {'Client-ID': 'wxk4qnqg3ajyzh9p2u1dx398ehud5f'}
  })
);
