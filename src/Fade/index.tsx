import React, { Children } from 'react';
import { duration } from '../defaultThemes';

import theme from '../defaultThemes';
import styled from 'styled-components';

interface FadeBaseComponetProps {
  inProp: boolean;
  timeout:
    | number
    | {
        enter: number;
        exit: number;
      };
}

const FadeBaseComponet = styled(React.Fragment)<FadeBaseComponetProps>`
  opacity: ${({ inProp }) => (inProp ? 1 : 0)};
  transition: ${({ inProp, timeout }) => {
    const transitionProps = {
      duration: typeof timeout === 'number' ? timeout : inProp ? timeout.enter : timeout.exit
    };
    return theme.transitions.create('opacity', transitionProps);
  }};
`;

export interface FadeProps extends FadeBaseComponetProps {
  in: boolean;
  onEnter?: any;
  onExit?: any;
  children: JSX.Element;
}

class Fade extends React.PureComponent<FadeProps> {
  static defaultProps = {
    timeout: {
      enter: duration.enteringScreen,
      exit: duration.leavingScreen
    }
  };
  render() {
    const { children, onEnter, onExit, in: inProp, ...childrenProps } = this.props;
    return <FadeBaseComponet as={children.type} inProp={inProp} {...childrenProps} {...children.props} />;
  }
}

export default Fade;
