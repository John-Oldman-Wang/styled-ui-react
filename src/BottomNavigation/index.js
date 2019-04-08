import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import theme from '../theme';

const BottomNavigationBaseComponent = styled(React.Fragment)`
  display: flex;
  justify-content: center;
  height: 56px;
  background-color: ${theme.palette.background.paper};
`;

class BottomNavigation extends React.PureComponent {
  render() {
    const { component, children, onChange, showLabels, value, ...other } = this.props;

    const newChildren = React.Children.map(children, (child, childIndex) => {
      if (!React.isValidElement(child)) {
        return null;
      }

      const childValue = child.props.value === undefined ? childIndex : child.props.value;
      return React.cloneElement(child, {
        selected: childValue === value,
        showLabel: child.props.showLabel !== undefined ? child.props.showLabel : showLabels,
        value: childValue,
        onChange
      });
    });

    return (
      <BottomNavigationBaseComponent as={component} {...other}>
        {newChildren}
      </BottomNavigationBaseComponent>
    );
  }
}

BottomNavigation.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  component: PropTypes.node.isRequired, // componentPropType,
  onChange: PropTypes.func,
  showLabels: PropTypes.bool,
  value: PropTypes.any
};

BottomNavigation.defaultProps = {
  component: 'div',
  showLabels: false
};

export default BottomNavigation;
