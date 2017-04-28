import React from 'react';

class Main extends React.Component {
  constructor (props) {
    super(props);
    this.getNewChannel = this.getNewChannel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {channel: 'wintergaming',
                  muted: false,
                  game: 'dota-2',
                  searchTerm: ''};
  }

  getNewChannel () {
    this.props.requestChannels(this.state.game);
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.channel.name !== nextProps.channel.name) {
      this.setState({channel: nextProps.channel.name});
    }
  }

  componentWillMount () {
    this.props.requestTopGames();
    this.getNewChannel();
  }

  gamesList () {
    return this.props.games.map(thing =>
      <li className="game-list-item"
          key={thing.game.name}
          onClick={this.handleClick}
          id={thing.game.name}>
        <img src={thing.game.box.small}  />
        <div>{thing.game.name}</div>
      </li>
    );
  }

  handleSubmit (e) {
    e.preventDefault();
    this.props.requestSearchedGames(this.state.searchTerm);
  }

  handleClick (e) {
    e.preventDefault();
    this.setState({searchTerm: e.currentTarget.id});
    this.getNewChannel();
  }

  handleChange (e) {
    e.preventDefault();
    this.setState({ searchTerm: e.target.value });
  }

  render () {

    const { channel } = this.props;

    return (
      <div className="main">
        <div className="triangle-up-right">
        </div>
        <i className="fa fa-github" id="git" aria-hidden="true"></i>
        <div className="sidebar">
          <div className="logo">
            Twitch Roulette
          </div>
          <div className="search-box">
            <div className="magnifying-glass">
              <i className="fa fa-search" aria-hidden="true"></i>
            </div>
            <form onSubmit={this.handleSubmit}>
              <input type="text" placeholder="Search games" onChange={this.handleChange} className="search-input" value={this.state.searchTerm}></input>
            </form>
          </div>
          <div className="games-list">
            {this.gamesList()}
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
          <button className="button" onClick={this.getNewChannel}>RANDOM</button>
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
