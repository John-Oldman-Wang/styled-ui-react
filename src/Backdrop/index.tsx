import React from 'react';
import Fade, { FadeProps } from '../Fade';

import styled from 'styled-components';

interface BackdropBaseComponetProps extends FadeProps {
  invisible: boolean;
}

const BackdropBaseComponet = styled(Fade)<BackdropBaseComponetProps>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  background-color: ${({ invisible }) => (invisible ? `transparent` : `rgba(0, 0, 0, 0.5)`)};
  -webkit-tap-highlight-color: transparent;
  touch-action: none;
`;

interface BackdropProps {
  open: boolean;
  invisible?: boolean;
  transitionDuration?:
    | number
    | {
        enter: number;
        exit: number;
      };
}

const Backdrop: React.ComponentType<React.HTMLAttributes<HTMLDivElement> & BackdropProps> = function({
  open,
  transitionDuration,
  invisible = false,
  ...other
}: BackdropProps) {
  return (
    <BackdropBaseComponet in={open} invisible={invisible} timeout={transitionDuration} {...other}>
      <div data-mui-test="Backdrop" aria-hidden="true" />
    </BackdropBaseComponet>
  );
};

export default Backdrop;
