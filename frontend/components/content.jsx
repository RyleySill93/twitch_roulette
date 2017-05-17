import React from 'react';

const Content = (props) => {
  const { channel, state, getNewChannel } = props;
  return (
    <div className="content">
      <div className="header">
        <div className="title">
          {channel.game && channel.game.length > 0 ? channel.game : 'Unknown'}
          &nbsp;- {channel.name}
        </div>
        <button className="button" onClick={getNewChannel}>RANDOM</button>
      </div>
      <iframe
        src={`//player.twitch.tv/?&channel=${state.channel}&muted=${state.muted}`}
        height="506"
        width="900"
        frameBorder="0"
        scrolling="no"
        allowFullScreen="true">
      </iframe>
    </div>
  );
};

export default Content;
