import React from 'react';
import PropTypes from 'prop-types';
import theme from '../theme';
import styled, { css } from 'styled-components';

const RADIUS = 10;
const colorTypes = ['primary', 'secondary', 'error'];
const colorStyles = colorTypes.reduce((acc, colorType) => {
  acc[colorType] = css`
    background-color: ${theme.palette[colorType].main};
    color: ${theme.palette[colorType].contrastText};
  `;
  return acc;
}, {});

const invisibleStyle = css`
  transition: ${theme.transitions.create('transform', {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.leavingScreen
  })};
  transform: scale(0) translate(50%, -50%);
  transform-origin: 100% 0%;
`;

const dotStyle = css`
  height: 6px;
  min-width: 6px;
  padding: 0;
`;

const BadgeBaseComponet = styled.span`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  box-sizing: border-box;
  font-family: ${theme.typography.fontFamily};
  font-weight: ${theme.typography.fontWeightMedium};
  font-size: ${theme.typography.pxToRem(12)};
  min-width: ${RADIUS * 2}px;
  padding: 0 4px;
  height: ${RADIUS * 2}px;
  border-radius: ${RADIUS}px;
  background-color: ${theme.palette.color};
  color: ${theme.palette.textColor};
  z-index: 1;
  transform: scale(1) translate(50%, -50%);
  transform-origin: 100% 0%;
  transition: ${theme.transitions.create('transform', {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.enteringScreen
  })};
  ${({ color }) => colorStyles[color] || ''}
  ${({ invisible, badgeContent, showZero }) => (invisible == null && Number(badgeContent) === 0 && !showZero ? invisibleStyle : '')}
  ${({ variant }) => (variant === 'dot' ? dotStyle : '')}
`;

const WrapBadgeBaseComponet = styled(React.Fragment)`
  position: relative;
  display: inline-flex;
  vertical-align: middle;
`;

class Badge extends React.PureComponent {
  render() {
    const { badgeContent, children, className, color, component, invisible, showZero, max, variant, ...other } = this.props;

    let displayValue = '';
    if (variant !== 'dot') {
      displayValue = badgeContent > max ? `${max}+` : badgeContent;
    }
    return (
      <WrapBadgeBaseComponet as={component} className={className} {...other}>
        {children}
        <BadgeBaseComponet invisible={invisible} showZero={showZero} color={color} variant={variant}>
          {displayValue}
        </BadgeBaseComponet>
      </WrapBadgeBaseComponet>
    );
  }
}

Badge.propTypes = {
  badgeContent: PropTypes.node,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  color: PropTypes.oneOf(['default', 'primary', 'secondary', 'error']),
  component: PropTypes.node.isRequired,
  invisible: PropTypes.bool,
  max: PropTypes.number,
  showZero: PropTypes.bool,
  variant: PropTypes.oneOf(['standard', 'dot'])
};

Badge.defaultProps = {
  color: 'default',
  component: 'span',
  max: 99,
  showZero: false,
  variant: 'standard'
};

export default Badge;
