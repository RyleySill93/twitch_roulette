import { connect } from 'react-redux';
import Main from './main';
import { requestChannels,
         requestTopGames,
         requestSearchedGames } from '../actions/channel_actions';
import values from 'lodash/values';


const mapStateToProps = state => ({
  channel: state.channel,
  games: values(state.games)
});

const mapDispatchToProps = dispatch => ({
  requestChannels: (game) => dispatch(requestChannels(game)),
  requestTopGames: () => dispatch(requestTopGames()),
  requestSearchedGames: (searchTerm) => dispatch(requestSearchedGames(searchTerm))
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
