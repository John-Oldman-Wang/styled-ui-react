import React from 'react';
import { render } from 'react-dom';

import MPaper from '@material-ui/core/Paper';
import MAppBar from '@material-ui/core/AppBar';
import MAvatar from '@material-ui/core/Avatar';
import MFade from '@material-ui/core/Fade';

import Paper from '../src/Paper/index';
import AppBar from '../src/AppBar/index';
import Avatar from '../src/Avatar/index';
import Fade from '../src/Fade/index';
import Badge from '../src/Badge/index';

const root = document.getElementById('root');
class Test extends React.Component {
  constructor() {
    super();
    this.state = {
      flag: false
    };
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
        <MFade onEnter={() => {}} b={'b'} className="t" in={this.state.flag} a={'a'}>
          <div>
            <div>-------------------------</div>
            <div>-------------------------</div>
            <div>-------------------------</div>
          </div>
        </MFade>
        <MAvatar alt="Remy Sharp" src="/static/1.jpg" />
        <div>-------------------------</div>
        <div>-------------------------</div>
        <div>-------------------------</div>
        {/* <AppBar position="fixed">MAppBar</AppBar> */}
        <Paper ref={this.t} square elevation={2}>
          asdasd
        </Paper>
        <Badge badgeContent={4} color="primary">
          a
        </Badge>
        <Avatar alt="Remy Sharp" src="/static/1.jpg" />
        <Fade
          onEnter={() => {}}
          b={'b'}
          className="t"
          in={this.state.flag}
          a={'a'}
          onClick={() => {
            this.setState({
              flag: !this.state.flag
            });
          }}>
          <div>
            <div>-------------------------</div>
            <div>-------------------------</div>
            <div>-------------------------</div>
          </div>
        </Fade>
      </>
    );
  }
}

render(<Test />, root);
