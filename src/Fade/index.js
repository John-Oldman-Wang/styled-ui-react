import React from 'react';
import PropTypes from 'prop-types';
import { duration } from '../styles/transitions';

import theme from '../theme';
import styled from 'styled-components';

const FadeBaseComponet = styled(React.Fragment)`
  opacity: ${({ inProp }) => (inProp ? 1 : 0)};
  transition: ${({ inProp, timeout }) => {
    const transitionProps = {
      duration: typeof timeout === 'number' ? timeout : inProp ? timeout.enter : timeout.exit
    };
    return theme.transitions.create('opacity', transitionProps);
  }};
`;

class Fade extends React.PureComponent {
  render() {
    const { children, onEnter, onExit, in: inProp, ...childrenProps } = this.props;
    return <FadeBaseComponet as={children.type} inProp={inProp} {...childrenProps} {...children.props} />;
  }
}

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool,
  onEnter: PropTypes.func,
  onExit: PropTypes.func,
  style: PropTypes.object,
  timeout: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({ enter: PropTypes.number, exit: PropTypes.number })])
};

Fade.defaultProps = {
  timeout: {
    enter: duration.enteringScreen,
    exit: duration.leavingScreen
  }
};

export default Fade;
