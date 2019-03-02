import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { PaperBaseStyledComponent } from '../Paper';
import theme from '../theme';
const backgroundColorDefault = theme.palette.type === 'light' ? theme.palette.grey[100] : theme.palette.grey[900];

const complexMixin = css`
  top: 0;
  left: auto;
  right: 0;
`;

const AppBarBaseComponet = styled(PaperBaseStyledComponent)`
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
const AppBar = React.forwardRef(function AppBar(props, ref) {
  return <AppBarBaseComponet as="header" square elevation={4} ref={ref} className={'asdasd'} {...props} />;
});

AppBar.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  color: PropTypes.oneOf(['inherit', 'primary', 'secondary', 'default']),
  position: PropTypes.oneOf(['fixed', 'absolute', 'sticky', 'static', 'relative'])
};

AppBar.defaultProps = {
  color: 'primary',
  position: 'fixed'
};

export default AppBar;
