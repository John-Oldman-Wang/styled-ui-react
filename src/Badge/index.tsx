import React from 'react';
import theme from '../defaultThemes';
import styled, { css } from 'styled-components';

const RADIUS = 10;
const colorTypes: Array<'primary' | 'secondary' | 'error'> = ['primary', 'secondary', 'error'];

type ColorStyles = {
  primary?: any;
  secondary?: any;
  error?: any;
};

const colorStyles: ColorStyles = {};
colorTypes.reduce((acc, colorType) => {
  acc[colorType] = css`
    background-color: ${theme.palette[colorType].main};
    color: ${theme.palette[colorType].contrastText};
  `;
  return acc;
}, colorStyles);

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

interface BadgeBaseComponetProps {
  color: 'primary' | 'secondary' | 'error' | 'default';
  invisible: boolean;
  variant: 'dot' | any;
}

const BadgeBaseComponet = styled.span<BadgeBaseComponetProps>`
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
  ${({ color }) => (color !== 'default' ? colorStyles[color] : '')}
  ${({ invisible }) => (invisible ? invisibleStyle : '')}
  ${({ variant }) => (variant === 'dot' ? dotStyle : '')}
`;

interface WrapBadgeBaseComponetProps {
  className: string;
}
const WrapBadgeBaseComponet = styled(React.Fragment)<WrapBadgeBaseComponetProps>`
  position: relative;
  display: inline-flex;
  vertical-align: middle;
`;

interface Badge {
  className: string;
  badgeContent: JSX.Element | number;
  color: 'primary' | 'secondary' | 'error' | 'default';
  displayValue: number;
  invisible: boolean;
  component: keyof JSX.IntrinsicElements | React.ComponentType<any>;
  showZero: boolean;
  max: number;
  variant: string;
}

class Badge extends React.PureComponent<Badge> {
  static defaultProps = {
    color: 'default',
    component: 'span',
    max: 99,
    showZero: false,
    variant: 'standard'
  };

  render() {
    const { badgeContent, children, className, color, component, invisible: invisibleProp, showZero, max, variant, ...other } = this.props;

    let invisible = false;

    if (invisibleProp == null && Number(badgeContent) === 0 && !showZero) {
      invisible = true;
    }

    let displayValue = '';
    if (variant !== 'dot' && typeof badgeContent === 'number') {
      displayValue = badgeContent > max ? `${max}+` : badgeContent + '';
    }
    return (
      <WrapBadgeBaseComponet as={component} className={className} {...other}>
        {children}
        <BadgeBaseComponet invisible={invisible} color={color} variant={variant}>
          {displayValue}
        </BadgeBaseComponet>
      </WrapBadgeBaseComponet>
    );
  }
}

export default Badge;
