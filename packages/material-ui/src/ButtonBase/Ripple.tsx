import React from 'react';

class Ripple extends React.Component {
  state = {
    visible: false,
    leaving: false
  };

  handleEnter = () => {
    this.setState({
      visible: true
    });
  };

  handleExit = () => {
    this.setState({
      leaving: true
    });
  };

  render() {
    return null;
  }
}

export default Ripple;
