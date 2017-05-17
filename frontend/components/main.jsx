import React from 'react';

import Content from './content';
import Sidebar from './sidebar';

const LOADING = 'LOADING';

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
    this.props.receiveLoadingState(LOADING);
  }

  searchGames (e) {
    e.preventDefault();
    this.props.requestSearchedGames(this.state.searchTerm);
  }

  getNewChannel () {
    this.props.requestChannels(this.state.game);
    this.props.receiveLoadingState(LOADING);
  }

  handleClick (e) {
    e.preventDefault();
    this.state.game = e.currentTarget.id;
    this.props.receiveLoadingState(LOADING);
    this.getNewChannel();
  }

  handleChange (e) {
    e.preventDefault();
    this.setState({ searchTerm: e.target.value });
  }

  loader () {
    return (
      <div className='loader'>
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
    const { channel, loadingState } = this.props;

    return (
      <div className="main">
        <div className="triangle-up-right">
        </div>
        <a href="https://github.com/RyleySill93/twitch_roulette" target="_blank">
          <i className="fa fa-github" id="git" aria-hidden="true"></i>
        </a>
        <Sidebar searchGames={this.searchGames}
                 handleChange={this.handleChange}
                 handleClick={this.handleClick}
                 searchTerm={this.state.searchTerm}
                 games={this.props.games}/>
        {loadingState === LOADING ? this.loader() : this.content()}
      </div>
    );
  }
}

export default Main;
