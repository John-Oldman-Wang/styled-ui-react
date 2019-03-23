import React from 'react';
import { render } from 'react-dom';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Icon from '@material-ui/core/Icon';

import MyBottomNavigation from '../lib/BottomNavigation';
import MyBottomNavigationAction from '../lib/BottomNavigationAction';

import * as A from '@material-ui/core';
import * as B from '../lib/index';

const bb = Object.keys(B);
console.log(
  Object.keys(A)
    .map((i) => {
      if (bb.includes(i)) {
        return `- [x] ${i}`;
      }
      return `- [ ] ${i}`;
    })
    .join('\n')
);
const root = document.getElementById('root');
class Test extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 'recents'
    };
  }
  handleChange(key) {
    return (event, value) => {
      this.setState({
        [key]: value
      });
    };
  }
  render() {
    const { value } = this.state;
    return (
      <>
        <BottomNavigation value={value} onChange={this.handleChange('value')}>
          <BottomNavigationAction label="Recents" value="recents" showLabel icon={<RestoreIcon />} />
          <BottomNavigationAction label="Favorites" value="favorites" icon={<FavoriteIcon />} />
        </BottomNavigation>

        <MyBottomNavigation value={value} onChange={this.handleChange('value')}>
          <MyBottomNavigationAction label="Recents" value="recents" showLabel icon={<RestoreIcon />} />
          <MyBottomNavigationAction label="Favorites" value="favorites" icon={<FavoriteIcon />} />
        </MyBottomNavigation>
      </>
    );
  }
}

render(<Test />, root);
