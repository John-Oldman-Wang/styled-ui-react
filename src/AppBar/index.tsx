import React from 'react';
import styled, { css } from 'styled-components';
import { PaperBaseStyledComponent } from '../Paper';
import theme from '../defaultThemes';
const backgroundColorDefault = theme.palette.type === 'light' ? theme.palette.grey[100] : theme.palette.grey[900];

const complexMixin = css`
  top: 0;
  left: auto;
  right: 0;
`;

interface AppBarBaseComponetProps {
  position: 'fixed' | 'absolute' | 'sticky' | 'static' | 'relative';
  color: 'inherit' | 'primary' | 'secondary' | 'default';
  ref?: React.Ref<{}>;
}

const AppBarBaseComponet = styled(PaperBaseStyledComponent)<AppBarBaseComponetProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  z-index: ${theme.zIndex.appBar};
  flex-shrink: 0;
  position: ${({ position }) => position};
  background-color: ${({ color }) =>
    color === 'default'
      ? backgroundColorDefault
      : color === 'primary'
      ? theme.palette.primary.main
      : color === 'secondary'
      ? theme.palette.secondary.main
      : null};
  color: ${({ color }) =>
    color === 'default'
      ? theme.palette.getContrastText(backgroundColorDefault)
      : color === 'primary'
      ? theme.palette.primary.contrastText
      : color === 'secondary'
      ? theme.palette.secondary.contrastText
      : null};

  ${({ position }) => (['fixed', 'absolute', 'sticky'].includes(position) ? complexMixin : '')}
`;

type AppBarProps = {
  color?: 'inherit' | 'primary' | 'secondary' | 'default';
  position?: 'fixed' | 'absolute' | 'sticky' | 'static' | 'relative';
  children?: React.ReactNode;
};

const AppBar: React.ComponentType<React.HTMLAttributes<HTMLHeadElement> & AppBarProps> = React.forwardRef(function(
  { color = 'primary', position = 'fixed', ...other }: React.HTMLAttributes<HTMLHeadElement> & AppBarProps,
  ref
) {
  return <AppBarBaseComponet as="header" square elevation={4} ref={ref} color={color} position={position} {...other} />;
});

export default AppBar;
