import React from 'react';

class Main extends React.Component {
  constructor (props) {
    super(props);
    this.getNewChannel = this.getNewChannel.bind(this);
    this.state = {channel: 'wintergaming', muted: false};
  }

  getNewChannel () {
    this.props.requestChannels();
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.channel !== nextProps.channel) {
      this.setState({channel: nextProps.channel});
    }
  }

  componentWillMount () {
    this.getNewChannel();
  }

  render () {
    return (
      <div className="main">
        <div className="header">
          <img src="http://res.cloudinary.com/dwqeotsx5/image/upload/c_crop,h_213,w_1920/v1493350430/L5zqHSoxhY6x7mWekDPw0x0_jLe02pyoVX-t2HJi9sw_zq79zc.png" />
          <h1>Twitch Roulette</h1>
        </div>
        <div className="content">
          <iframe
            src={`http://player.twitch.tv/?channel=${this.state.channel}&muted=${this.state.muted}`}
            height="405"
            width="720"
            frameBorder="0"
            scrolling="no"
            allowFullScreen="true">
          </iframe>
          <button className="button" onClick={this.getNewChannel}>random</button>
        </div>
      </div>
    );
  }
}

export default Main;
