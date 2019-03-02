import React from 'react';
import { render } from 'react-dom';
const root = document.getElementById('root');

import MPaper from '@material-ui/core/Paper';
import MAppBar from '@material-ui/core/AppBar';

import Paper from '../src/Paper/index';
import AppBar from '../src/AppBar/index';

class Test extends React.Component {
  constructor() {
    super();
    window.t = this;
    this.m = React.createRef();
    this.t = React.createRef();
  }
  render() {
    return (
      <>
        {/* <MAppBar position="fixed">MAppBar</MAppBar> */}
        <MPaper ref={this.m} square elevation={2}>
          asdasd
        </MPaper>
        <div>-------------------------</div>
        <div>-------------------------</div>
        <div>-------------------------</div>
        {/* <AppBar position="fixed">MAppBar</AppBar> */}
        <Paper ref={this.t} square elevation={2}>
          asdasd
        </Paper>
      </>
    );
  }
}

render(<Test />, root);
