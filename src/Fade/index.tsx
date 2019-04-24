import React from 'react';

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

export interface FadeProps {
  in: boolean;
  onEnter?: any;
  onExit?: any;
  children: JSX.Element;
  timeout?:
    | number
    | {
        enter: number;
        exit: number;
      };
}

const Fade: React.ComponentType<React.HTMLAttributes<HTMLDivElement> & FadeProps> = function({
  children,
  onEnter,
  onExit,
  in: inProp,
  timeout = {
    enter: 225,
    exit: 195
  },
  ...childrenProps
}: FadeProps) {
  return <FadeBaseComponet as={children.type} inProp={inProp} timeout={timeout} {...childrenProps} {...children.props} />;
};

export default Fade;
