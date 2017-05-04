import React from 'react';

class Main extends React.Component {
  constructor (props) {
    super(props);
    this.getNewChannel = this.getNewChannel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.mainLoader = this.mainLoader.bind(this);
    this.buttonLoader = this.buttonLoader.bind(this);
    this.content = this.content.bind(this);
    this.state = {channel: 'twitch',
                  muted: false,
                  game: 'all',
                  searchTerm: ''};
  }

  getNewChannel () {
    this.props.requestChannels(this.state.game);
    this.props.receiveLoadingState('loading');
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.channel.name !== nextProps.channel.name) {
      this.setState({channel: nextProps.channel.name});
      this.props.receiveLoadingState('');
    }
  }

  componentWillMount () {
    this.props.requestTopGames();
    this.getNewChannel();
    this.props.receiveLoadingState('loading');
  }

  gamesList () {
    return this.props.games.map(game =>
      <li className="game-list-item"
          key={game.name}
          onClick={this.handleClick}
          id={game.name}>
        <img src={game.box.small}  />
        <div>{game.name}</div>
      </li>
    );
  }

  handleSubmit (e) {
    e.preventDefault();
    this.props.requestSearchedGames(this.state.searchTerm);
  }

  handleClick (e) {
    e.preventDefault();
    this.state.game = e.currentTarget.id;
    this.props.receiveLoadingState('loading');
    this.getNewChannel();
  }

  handleChange (e) {
    e.preventDefault();
    this.setState({ searchTerm: e.target.value });
  }

  mainLoader () {
    return (
      <div className='mainLoader'>
      </div>
    );
  }

  buttonLoader () {
    return (
      <div className='buttonLoader'>
      </div>
    );
  }

  content () {
    return (
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
    );
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
            <li className="game-list-item"
                key='all'
                onClick={this.handleClick}
                id='all'>
              <div id="all-games"><i className="fa fa-twitch" aria-hidden="true"></i></div>
              <div>All Games</div>
            </li>
            {this.gamesList()}
          </div>
        </div>
        {this.props.loadingState === 'loading' ? this.mainLoader() : this.content()}
      </div>
    );
  }
}

export default Main;
