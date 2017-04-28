import React from 'react';
import MainContainer from './main_container';
import { Provider } from 'react-redux';


class Root extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <Provider store={this.props.store} >
        <MainContainer />
      </Provider>
    );
  }

}

export default Root;
