import axios from 'axios';

export const fetchChannels = (channel) => (

  // $.ajax({
  //   method: 'GET',
  //   url: 'https://api.twitch.tv/kraken/search/streams?query=starcraft',
  //   headers: {'Client-ID': 'wxk4qnqg3ajyzh9p2u1dx398ehud5f'}
  // })
  axios({
    method: 'get',
    url: 'https://api.twitch.tv/kraken/search/streams?query=starcraft',
    headers: {'Client-ID': 'wxk4qnqg3ajyzh9p2u1dx398ehud5f'}
  })
  // axios.get('https://api.twitch.tv/kraken/search/streams?query=starcraft');
);
