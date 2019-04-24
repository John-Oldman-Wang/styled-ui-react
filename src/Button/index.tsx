import React from 'react';
import styled, { css } from 'styled-components';
import ButtonBase from '../ButtonBase';
import theme from '../defaultThemes';

function fade(color: string, alpha: number | string): string {
  return `rgba(${color
    .replace(/^\#([0-9a-z]{2})([0-9a-z]{2})([0-9a-z]{2})$/, '$1,$2,$3')
    .split(',')
    .map((i) => {
      return Number(`0x${i}`);
    })
    .join(', ')}, ${alpha})`;
}

const ButtonText = css`
  padding: 6px 8px;
`;

interface ButtonColorCssProps {
  color: 'primary' | 'secondary';
}

const ButtonTextPrimarySecondary = ({ color }: ButtonColorCssProps) => css`
  color: ${theme.palette[color].main};
  &:hover {
    background-color: ${fade(theme.palette[color].main, theme.palette.action.hoverOpacity)};
    @media (hover: none) {
      background-color: transparent;
    }
  }
`;

const ButtonOutlined = css`
  padding: 5px 16px;
  border: 1px solid ${theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)'};
  &:disabled {
    border: 1px solid ${theme.palette.action.disabled};
  }
`;

const ButtonOutlinedPrimarySecondary = ({ color }: ButtonColorCssProps) => css`
  color: ${theme.palette[color].main};
  border: 1px solid ${fade(theme.palette[color].main, 0.5)};
  &:hover {
    border: 1px solid ${theme.palette[color].main};
    background-color: ${fade(theme.palette[color].main, theme.palette.action.hoverOpacity)};
    @media (hover: none) {
      background-color: transparent;
    }
  }
`;

const ButtomContained = css`
  color: ${theme.palette.getContrastText(theme.palette.grey[300])};
  background-color: ${theme.palette.grey[300]};
  box-shadow: ${theme.shadows[2]};
  &:active {
    box-shadow: ${theme.shadows[8]};
  }
  &:disabled {
    color: ${theme.palette.action.disabled};
    box-shadow: ${theme.shadows[0]};
    background-color: ${theme.palette.action.disabledBackground};
  }
  &:hover {
    background-color: ${theme.palette.grey.A100};

    @media (hover: none) {
      background-color: ${theme.palette.grey[300]};
    }
    &:disabled {
      background-color: ${theme.palette.action.disabledBackground};
    }
  }
`;

const ButtomContainedPrimarySecondary = ({ color }: ButtonColorCssProps) => css`
  color: ${theme.palette[color].contrastText};
  background-color: ${theme.palette[color].main};
  &:hover {
    background-color: ${theme.palette[color].dark};
    @media (hover: none) {
      background-color: ${theme.palette[color].main};
    }
  }
`;

const ButtonSizeSmall = css`
  padding: 4px 8px;
  min-width: 64px;
  font-size: ${theme.typography.pxToRem(13)};
`;

const ButtonSizeLarge = css`
  padding: 8px 24px;
  font-size: ${theme.typography.pxToRem(15)};
`;

interface ButtomBaseComponentProps {
  selected: boolean;
  color: 'default' | 'inherit' | 'primary' | 'secondary';
  variant: 'text' | 'outlined' | 'contained' | 'fab' | 'extendedFab' | 'flat' | 'raised';
  disabled: boolean;
  fullWidth: boolean;
  size: 'small' | 'medium' | 'large';
}

const ButtomBaseComponent = styled(ButtonBase)<ButtomBaseComponentProps>`
  padding: 6px 16px;
  min-width: 64px;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  font-family: Roboto, Helvetica, Arial, sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.02857em;
  line-height: 1.75;
  text-transform: uppercase;
  box-sizing: border-box;
  border-radius: ${theme.shape.borderRadius}px;
  color: ${({ color }) => (color != 'inherit' ? theme.palette.text.primary : 'inherit')};
  transition: ${theme.transitions.create(['background-color', 'box-shadow', 'border'], { duration: theme.transitions.duration.short })};

  &:hover {
    text-decoration: none;
    background-color: rgba(0, 0, 0, 0.08);

    @media (hover: none) {
      background-color: transparent;
    }

    &:disable {
      background-color: transparent;
    }
  }

  &:disabled {
    color: ${theme.palette.action.disabled};
  }

  ${({ variant, color }) => {
    return variant == 'text'
      ? css`
          ${ButtonText}
          ${color == 'primary' || color == 'secondary' ? ButtonTextPrimarySecondary({ color }) : ''}
        `
      : '';
  }}

  ${({ variant, color }) => {
    return variant == 'outlined'
      ? css`
          ${ButtonOutlined}
          ${color == 'primary' || color == 'secondary' ? ButtonOutlinedPrimarySecondary({ color }) : ''}
        `
      : '';
  }}

  ${({ variant, color }) => {
    return variant == 'contained'
      ? css`
          ${ButtomContained}
          ${color == 'primary' || color == 'secondary' ? ButtomContainedPrimarySecondary({ color }) : ''}
        `
      : '';
  }}

  ${({ size }) => (size == 'large' ? ButtonSizeLarge : size == 'small' ? ButtonSizeSmall : '')}

  ${({ color }) => (color == 'inherit' ? 'border-color: currentColor' : '')}
`;

const ButtonLabel = styled.span`
  width: 100%;
  display: inherit;
  align-items: inherit;
  justify-content: inherit;
`;

interface ButtonProps {
  color?: 'default' | 'inherit' | 'primary' | 'secondary';
  component?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
  disabled?: boolean;
  disableFocusRipple?: boolean;
  disableRipple?: boolean;
  focusVisibleClassName?: string;
  fullWidth?: boolean;
  href?: string;
  size?: 'small' | 'medium' | 'large';
  type?: string;
  variant?: 'text' | 'outlined' | 'contained' | 'fab' | 'extendedFab' | 'flat' | 'raised';
}

class Button extends React.Component<React.AnchorHTMLAttributes<HTMLElement> & React.ButtonHTMLAttributes<HTMLElement> & ButtonProps> {
  static defaultProps = {
    color: 'default',
    component: 'button',
    disabled: false,
    disableFocusRipple: false,
    fullWidth: false,
    size: 'medium',
    type: 'button',
    variant: 'text'
  };
  render() {
    const {
      color = 'default',
      disabled,
      fullWidth,
      size = 'medium',
      variant = 'text',
      children,
      component = 'button',
      ...other
    } = this.props;
    return (
      <ButtomBaseComponent
        disableRipple
        color={color}
        variant={variant}
        disabled={!!disabled}
        fullWidth={!!fullWidth}
        size={size}
        selected
        {...other}>
        <ButtonLabel>{children} </ButtonLabel>
      </ButtomBaseComponent>
    );
  }
}

export default Button;
