import { connect } from 'react-redux';
import Main from './main';
import { requestChannels, requestTopGames } from '../actions/channel_actions';

const mapStateToProps = state => ({
  channel: state.channel,
  games: state.games
});

const mapDispatchToProps = dispatch => ({
  requestChannels: () => dispatch(requestChannels()),
  requestTopGames: () => dispatch(requestTopGames())
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
