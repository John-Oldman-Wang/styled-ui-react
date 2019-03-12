import React from 'react';

import styled from 'styled-components';
import theme from '../defaultThemes';

const BottomNavigationBaseComponent = styled(React.Fragment)`
  display: flex;
  justify-content: center;
  height: 56px;
  background-color: ${theme.palette.background.paper};
`;

type Child = JSX.Element & {
  props: {
    value?: any;
  };
};

interface BottomNavigationProps {
  children: Array<Child> | Child;
  onChange: () => void;
  showLabels: boolean;
  component: keyof JSX.IntrinsicElements | React.ComponentType<any>;
  value: any;
}

class BottomNavigation extends React.PureComponent<BottomNavigationProps> {
  static defaultProps = {
    component: 'div',
    showLabels: false
  };
  render() {
    const { component, children, onChange, showLabels, value, ...other } = this.props;

    const newChildren = React.Children.map(children, (child: Child, childIndex) => {
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

export default BottomNavigation;
