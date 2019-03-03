import React from 'react';
import { render } from 'react-dom';
const root = document.getElementById('root');

import MPaper from '@material-ui/core/Paper';
import MAppBar from '@material-ui/core/AppBar';
import MAvatar from '@material-ui/core/Avatar';

import Paper from '../src/Paper/index';
import AppBar from '../src/AppBar/index';
import Avatar from '../src/Avatar/index';

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
        <MAvatar alt="Remy Sharp" src="/static/1.jpg" />
        <div>-------------------------</div>
        <div>-------------------------</div>
        <div>-------------------------</div>
        {/* <AppBar position="fixed">MAppBar</AppBar> */}
        <Paper ref={this.t} square elevation={2}>
          asdasd
        </Paper>
        <Avatar alt="Remy Sharp" src="/static/1.jpg" />
      </>
    );
  }
}

render(<Test />, root);
