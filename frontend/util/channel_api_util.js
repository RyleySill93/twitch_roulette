import axios from 'axios';

const checkChannels = (game, streams, currentOffset = 1000, lowerBound = 0, upperBound = 1000) => {
  console.log('checking channels', currentOffset, lowerBound, upperBound);
  let viewerCount = streams && streams[0] ? streams[0].viewers : null;
  console.log('viewer count', viewerCount);
  if (viewerCount && viewerCount <= 5) {
    return axios({
      method: 'get',
      url: `https://api.twitch.tv/kraken/search/streams?&offset=${currentOffset}&limit=25&query=${game}`,
      headers: {'Client-ID': 'wxk4qnqg3ajyzh9p2u1dx398ehud5f'}
    });
  }
  if (Math.abs(lowerBound - upperBound) < 2) {
    return console.log('error, no small streams found');
  }
  // let rand = Math.floor(Math.random() * (upperBound - lowerBound));
  if (viewerCount === null) {
    console.log('viewer count too small', currentOffset);
    upperBound = currentOffset;
    // console.log(rand);
    // currentOffset = currentOffset - rand;
  } else {
    console.log('viewer count too big', currentOffset);
    lowerBound = currentOffset;
    // currentOffset = currentOffset + rand;
  }
  currentOffset = Math.floor((upperBound + lowerBound) / 2);
  return axios({
    method: 'get',
    url: `https://api.twitch.tv/kraken/search/streams?&offset=${currentOffset}&limit=25&query=${game}`,
    headers: {'Client-ID': 'wxk4qnqg3ajyzh9p2u1dx398ehud5f'}
  }).then(res => {
    return checkChannels(game, res.data.streams, currentOffset, lowerBound, upperBound);
  });
};

export const fetchChannels = game => {
  game = game.toLowerCase().split(" ").join("-");
  return checkChannels(game);
};

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
