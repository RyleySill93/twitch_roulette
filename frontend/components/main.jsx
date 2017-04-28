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
    if (this.props.channel.name !== nextProps.channel.name) {
      console.log(this.props.channel);

      this.setState({channel: nextProps.channel.name});
    }
  }

  componentWillMount () {
    this.props.requestTopGames();
    this.getNewChannel();
  }

  render () {

    const { channel } = this.props;

    return (
      <div className="main">
        <div className="sidebar">
          <div className="logo">
            Twitch Roulette
          </div>
          <div className="search-box">
            <div className="magnifying-glass">
              <i className="fa fa-search" aria-hidden="true"></i>
            </div>
            <input type="text" placeholder="Search games" className="search-input"></input>
          </div>
        </div>
        <div className="content">
          <h1 className="title">
            {this.props.channel.game} - {this.props.channel.name}
          </h1>
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

// <div className="header">
//   <img src="http://res.cloudinary.com/dwqeotsx5/image/upload/c_crop,h_213,w_1920/v1493350430/L5zqHSoxhY6x7mWekDPw0x0_jLe02pyoVX-t2HJi9sw_zq79zc.png" />
//   <h1>Twitch Roulette</h1>
// </div>
