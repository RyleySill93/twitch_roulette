import React from 'react';

import Content from './content';

class Main extends React.Component {
  constructor (props) {
    super(props);
    this.getNewChannel = this.getNewChannel.bind(this);
    this.searchGames = this.searchGames.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {channel: 'twitch',
                  muted: false,
                  game: 'all',
                  searchTerm: ''};
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

  searchGames (e) {
    e.preventDefault();
    this.props.requestSearchedGames(this.state.searchTerm);
  }

  getNewChannel () {
    this.props.requestChannels(this.state.game);
    this.props.receiveLoadingState('loading');
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

  mainLoader () {
    return (
      <div className='mainLoader'>
      </div>
    );
  }

  content () {
    const { channel } = this.props;
    return (
      <Content channel={channel}
               state={this.state}
               getNewChannel={this.getNewChannel} />
    );
  }

  render () {

    const { channel } = this.props;

    return (
      <div className="main">
        <div className="triangle-up-right">
        </div>
        <a href="https://github.com/RyleySill93/twitch_roulette" target="_blank">
          <i className="fa fa-github" id="git" aria-hidden="true"></i>
        </a>
        <div className="sidebar">
          <div className="logo">
            Twitch Roulette
          </div>
          <div className="search-box">
            <div className="magnifying-glass">
              <i className="fa fa-search" aria-hidden="true"></i>
            </div>
            <form onSubmit={this.searchGames}>
              <input type="text"
                     placeholder="Search games"
                     onChange={this.handleChange}
                     className="search-input"
                     value={this.state.searchTerm}></input>
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
