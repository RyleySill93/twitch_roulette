import axios from 'axios';

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
    url: `https://api.twitch.tv/kraken/search/games?query=${searchTerm}`,
    headers: {'Client-ID': 'wxk4qnqg3ajyzh9p2u1dx398ehud5f',
              'Accept': 'application/vnd.twitchtv.v5+json'}
  })
);

export const fetchChannels = game => {
  game = game.toLowerCase().split(" ").join("-");
  if (game === 'all') {
    return fetchAllRandomChannels();
  }
  return checkChannels(game);
};

export const fetchAllRandomChannels = (game) => (
  axios({
    method: 'get',
    url: `https://api.twitch.tv/kraken/beta/streams/random/?game=${game}`,
    headers: {'Client-ID': 'wxk4qnqg3ajyzh9p2u1dx398ehud5f'}
  })
);

export const fetchRandomChannelsWithOffset = (game, currentOffset) => (
  axios({
    method: 'get',
    url: 'https://api.twitch.tv/kraken/search/streams?&offset=' +
          `${currentOffset}&limit=25&query=${game}`,
    headers: {'Client-ID': 'wxk4qnqg3ajyzh9p2u1dx398ehud5f'}
  })
);

//Binary search all of the pages of streamers until you find one where the
//viewer count is less than 6
const checkChannels = (game, streams, currentOffset = 1000, lowerBound = 0, upperBound = 1000) => {
  let viewerCount = streams && streams[0] ? streams[0].viewers : null;

  //break out if a stream with less than 5 viewers has been found
  if ((viewerCount && viewerCount <= 5) || (Math.abs(lowerBound - upperBound) < 2)) {
    return fetchRandomChannelsWithOffset(game, currentOffset);
  }
  //if viewer count is null then we are too far in, so decrease upperBound
  if (viewerCount === null) {
    upperBound = currentOffset;
  } else {
    lowerBound = currentOffset;
  }
  currentOffset = Math.floor((upperBound + lowerBound) / 2);
  return fetchRandomChannelsWithOffset(game, currentOffset).then(res => {
    return checkChannels(game, res.data.streams, currentOffset, lowerBound, upperBound);
  });
};
