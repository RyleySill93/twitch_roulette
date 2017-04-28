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
      <div>
        <iframe
          src={`http://player.twitch.tv/?channel=${this.state.channel}&muted=${this.state.muted}`}
          height="558"
          width="992"
          frameBorder="0"
          scrolling="no"
          allowFullScreen="true">
        </iframe>
        <button className="button" onClick={this.getNewChannel}>random</button>
      </div>
    );
  }
}

export default Main;
