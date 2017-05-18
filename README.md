# Twitch Roulette

Live version here: http://twitchroulette.club/

![twitchroulette](/docs/twitchroulette.png)

Twitch Roulette is a React/Redux app inspired [this reddit post](https://www.reddit.com/r/Twitch/comments/66ilns/why_doesnt_twitch_have_a_roulette_button/) to help users discover small-time streamers and new games. Users can either
select a completely random channel out of a pool of all current streamers,
or they can filter results by any game that they select in the sidebar.

## Streaming

Using the Twitch API, embedding video is as straightforward as including
the iframe below into a React component. `main.jsx` is responsible for
passing down the channel and muted state to the `content.jsx` which renders
the iframe itself.

```
<iframe
  src={`//player.twitch.tv/?&channel=${state.channel}&muted=${state.muted}`}
  height="506"
  width="900"
  frameBorder="0"
  scrolling="no"
  allowFullScreen="true">
</iframe>
```

## Searching Games

Using the Twitch API to search for games is also straightforward. After
the below call is made with a search term, the API will return a maximum
of 100 results for the search. Each result contains the name of the game
and its thumbnail image which are both used to construct the list of games
in the sidebar.

```
export const fetchGames = (searchTerm) => (
  axios({
    method: 'get',
    url: `https://api.twitch.tv/kraken/search/games?query=${searchTerm}`,
    headers: {'Client-ID': CLIENT_ID,
              'Accept': 'application/vnd.twitchtv.v5+json'}
  })
);
```

## Retrieving Random Channels

If the user hasn't specified a particular game filter, then the application
will default to the below API call to retrieve a completely random channel.

```
export const fetchAllRandomChannels = (game) => (
  axios({
    method: 'get',
    url: `https://api.twitch.tv/kraken/beta/streams/random/?game=${game}`,
    headers: {'Client-ID': CLIENT_ID}
  })
);
```

Otherwise, the application will perform a search filtered by the selected
game. One technical challenge was that Twitch orders results of this search
based on the number users who are currently following a stream (in descending order).
Since one of the goals of this project is to increase users' exposure
to small-time streamers, a binary search method is implemented to identify
streamers who currently have less than 6 followers.

```
const checkChannels = (game, streams, currentOffset = 1000, lowerBound = 0, upperBound = 1000) =>{
  let viewerCount = streams && streams[0] ? streams[0].viewers : null;

  if ((viewerCount && viewerCount <= 5) || (Math.abs(lowerBound - upperBound) < 2)) {
    return fetchRandomChannelsWithOffset(game, currentOffset);
  }

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

...

export const fetchRandomChannelsWithOffset = (game, currentOffset) => (
  axios({
    method: 'get',
    url: 'https://api.twitch.tv/kraken/search/streams?&offset=' +
          `${currentOffset}&limit=25&query=${game}`,
    headers: {'Client-ID': CLIENT_ID}
  })
);
```
