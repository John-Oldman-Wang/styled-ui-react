import React from 'react';
import styled from 'styled-components';

import NoSsr from '../NoSsr';
import TouchRipple from './TouchRipple';

const ButtonBaseStyledComponet = styled(React.Fragment)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  -webkit-tap-highlight-color: transparent;
  background-color: transparent;
  outline: none;
  border: 0;
  margin: 0;
  border-radius: 0;
  padding: 0;
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  -moz-appearance: none;
  -webkit-appearance: none;
  text-decoration: none;
  color: inherit;
  &::-moz-focus-inner {
    border-style: none;
  }
  &:disabled {
    pointer-events: none;
    cursor: default;
  }
`;

// interface ButtonBaseProps {
// }

interface ButtonBaseAttr {
  action?: (o: any) => void;
  onFocusVisible?: (o: any) => void;
  component?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
  href?: string;
  disableRipple?: boolean;
  disabled?: boolean;
  focusRipple?: boolean;
  type?: string;
  TouchRippleProps?: object;
  onClick?: (e: any) => void;
  onBlur?: (e: any) => void;
  onFocus?: (e: any) => void;
  onKeyDown?: (e: any) => void;
  onKeyUp?: (e: any) => void;
  onMouseDown?: (e: any) => void;
  onMouseLeave?: (e: any) => void;
  onMouseUp?: (e: any) => void;
  onTouchEnd?: (e: any) => void;
  onTouchMove?: (e: any) => void;
  onTouchStart?: (e: any) => void;
  onContextMenu?: (e: any) => void;
}
interface ButtonBaseState {
  focusVisible?: boolean;
}

export type ButtonBaseProps = React.AnchorHTMLAttributes<HTMLElement> & React.ButtonHTMLAttributes<HTMLElement> & ButtonBaseAttr;
class ButtonBase extends React.Component<ButtonBaseProps, ButtonBaseState> {
  static defaultProps = {
    centerRipple: false,
    component: 'button',
    disableRipple: false,
    disableTouchRipple: false,
    focusRipple: false,
    tabIndex: '0',
    type: 'button'
  };

  state: ButtonBaseState = {};

  ripple: any;

  handleBlur = (e: any) => {
    const { onBlur } = this.props;
    this.ripple.stop(e);
    onBlur && onBlur(e);
  };

  handleMouseDown = (e: any) => {
    const { onMouseDown } = this.props;
    this.ripple.start(e);
    onMouseDown && onMouseDown(e);
  };
  handleMouseLeave = (e: any) => {
    const { onMouseLeave } = this.props;
    this.ripple.stop(e);
    onMouseLeave && onMouseLeave(e);
  };
  handleMouseUp = (e: any) => {
    const { onMouseUp } = this.props;
    this.ripple.stop(e);
    onMouseUp && onMouseUp(e);
  };
  handleTouchEnd = (e: any) => {
    const { onTouchEnd } = this.props;
    this.ripple.stop(e);
    onTouchEnd && onTouchEnd(e);
  };
  handleTouchMove = (e: any) => {
    const { onTouchMove } = this.props;
    this.ripple.stop(e);
    onTouchMove && onTouchMove(e);
  };
  handleTouchStart = (e: any) => {
    const { onTouchStart } = this.props;
    this.ripple.start(e);
    onTouchStart && onTouchStart(e);
  };
  handleContextMenu = (e: any) => {
    const { onContextMenu } = this.props;
    this.ripple.stop(e);
    onContextMenu && onContextMenu(e);
  };
  render() {
    const {
      component,
      type,
      disabled,
      children,
      onBlur,
      onFocus,
      onFocusVisible,
      onKeyDown,
      onKeyUp,
      onMouseDown,
      onMouseLeave,
      onMouseUp,
      onTouchEnd,
      onTouchMove,
      onTouchStart,
      TouchRippleProps,
      ...other
    } = this.props;
    let ComponentProp = component;
    const buttonProps: any = {};
    if (ComponentProp === 'button') {
      buttonProps.type = type || 'button';
      buttonProps.disabled = disabled;
    } else {
      buttonProps.role = 'button';
    }
    if (ComponentProp === 'button' && other.href) {
      ComponentProp = 'a';
    }
    return (
      <ButtonBaseStyledComponet
        onBlur={this.handleBlur}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onMouseDown={this.handleMouseDown}
        onMouseLeave={this.handleMouseLeave}
        onMouseUp={this.handleMouseUp}
        onTouchEnd={this.handleTouchEnd}
        onTouchMove={this.handleTouchMove}
        onTouchStart={this.handleTouchStart}
        onContextMenu={this.handleContextMenu}
        as={ComponentProp}
        {...buttonProps}
        {...other}>
        {children}
        <NoSsr>
          <TouchRipple ref={(node) => (this.ripple = node)} {...TouchRippleProps} />
        </NoSsr>
      </ButtonBaseStyledComponet>
    );
  }
}

export default ButtonBase;
