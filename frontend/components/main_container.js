import { connect } from 'react-redux';
import Main from './main';
import { requestChannels } from '../actions/channel_actions';

const mapStateToProps = state => ({
  channel: state.channel
});

const mapDispatchToProps = dispatch => ({
  requestChannels: () => dispatch(requestChannels())
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
