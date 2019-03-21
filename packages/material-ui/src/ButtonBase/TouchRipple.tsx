import React from 'react';
import ReactDOM from 'react-dom';
import styled, { css, keyframes } from 'styled-components';
import theme from '../defaultThemes';
const DURATION = 550;

export const DELAY_RIPPLE = 80;

const muiRippleEnter = keyframes`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }
  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`;
const muiRippleExit = keyframes`
  0% {
    opacity: 1
  }
  100% {
    opacity: 0
  }
`;

const muiRipplePulsate = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.92);
  }
  100% {
    transform: scale(1);
  }
`;

const TouchRippleBaseStyledComponet = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: inherit;
  pointer-events: none;
  z-index: 0;
`;
interface RippleBaseStyledComponetProps {
  rippleSize: number;
  rippleY: number;
  rippleX: number;
  pulsate: boolean;
  visible: boolean;
}

const RippleBaseStyledComponet = styled.span<RippleBaseStyledComponetProps>`
  position: absolute;
  top: ${({ rippleSize, rippleY }) => -(rippleSize / 2) + rippleY}px;
  left: ${({ rippleSize, rippleX }) => -(rippleSize / 2) + rippleX}px;
  opacity: 0;
  width: ${({ rippleSize }) => rippleSize}px;
  height: ${({ rippleSize }) => rippleSize}px;
  ${({ pulsate }) => (pulsate ? RipplePulsateCss : '')}
  ${({ visible }) => (visible ? RippleVisibleCss : '')}
`;

const RippleVisibleCss = css`
  opacity: 0.3;
  transform: scale(1);
  animation: ${muiRippleEnter} ${DURATION}ms ${theme.transitions.easing.easeInOut};
  animation-name: ${muiRippleEnter};
`;

const RipplePulsateCss = css`
  animation-duration: ${theme.transitions.duration.shorter}ms;
`;

interface RippleChildBaseStyledComponetProps {
  leaving: boolean;
  pulsate: boolean;
}

const RippleChildBaseStyledComponet = styled.span<RippleChildBaseStyledComponetProps>`
  opacity: 1;
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: currentColor;
  ${({ leaving }) => (leaving ? RippleChildLeavingCss : '')}
  ${({ pulsate }) => (pulsate ? RippleChildPulsateCss : '')}
`;

const RippleChildLeavingCss = css`
  opacity: 0;
  animation: ${muiRippleExit} ${DURATION}ms ${theme.transitions.easing.easeInOut};
  animation-name: ${muiRippleExit};
`;

const RippleChildPulsateCss = css`
  position: absolute;
  top: 0;
  left: 0;
  animation: ${muiRipplePulsate} 2500ms ${theme.transitions.easing.easeInOut} 200ms infinite;
  animation-name: ${muiRipplePulsate};
`;

interface TouchRippleProps {
  center: boolean;
  className?: string;
}

interface TouchRippleState {
  stopIndex: number;
  ripples: Array<any>;
}
class TouchRipple extends React.PureComponent<TouchRippleProps, TouchRippleState> {
  static defaultProps = {
    center: false
  };
  ignoreMouseDown: boolean;
  timer: any;
  key: number;

  constructor(props: TouchRippleProps) {
    super(props);
    this.state = {
      stopIndex: 0,
      ripples: []
    };
    this.ignoreMouseDown = false;
    this.timer = null;
    this.key = 0;
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.clear = this.clear.bind(this);
  }

  start(event: any = {}) {
    if (event.type === 'mousedown' && this.ignoreMouseDown) {
      this.ignoreMouseDown = false;
      return;
    }

    if (event.type === 'touchstart') {
      this.ignoreMouseDown = true;
    }

    const { center } = this.props;
    const element: any = ReactDOM.findDOMNode(this);
    let rect: {
      width: number;
      height: number;
      left: number;
      top: number;
    };
    if (element && 'getBoundingClientRect' in element) {
      rect = element.getBoundingClientRect();
    } else {
      rect = {
        width: 0,
        height: 0,
        left: 0,
        top: 0
      };
    }

    let rippleX;
    let rippleY;
    let rippleSize;

    if (center || (event.clientX === 0 && event.clientY === 0) || (!event.clientX && !event.touches)) {
      rippleX = Math.round(rect.width / 2);
      rippleY = Math.round(rect.height / 2);
    } else {
      const clientX = event.clientX ? event.clientX : event.touches[0].clientX;
      const clientY = event.clientY ? event.clientY : event.touches[0].clientY;
      rippleX = Math.round(clientX - rect.left);
      rippleY = Math.round(clientY - rect.top);
    }

    if (center) {
      rippleSize = Math.sqrt((2 * rect.width ** 2 + rect.height ** 2) / 3);
      if (rippleSize % 2 === 0) {
        rippleSize += 1;
      }
    } else {
      const sizeX = Math.max(Math.abs((element ? element.clientWidth : 0) - rippleX), rippleX) * 2 + 2;
      const sizeY = Math.max(Math.abs((element ? element.clientHeight : 0) - rippleY), rippleY) * 2 + 2;
      rippleSize = Math.sqrt(sizeX ** 2 + sizeY ** 2);
    }

    this.setState({
      ripples: [
        ...this.state.ripples,
        {
          key: ++this.key,
          rippleSize,
          rippleY,
          rippleX
        }
      ]
    });
  }

  stop() {
    const { ripples, stopIndex } = this.state;
    if (ripples && ripples.length && stopIndex < ripples.length) {
      this.setState({
        stopIndex: stopIndex + 1
      });
    }
    clearInterval(this.timer);
    this.timer = setTimeout(() => {
      this.clear();
    }, DURATION * 3);
  }

  clear() {
    const { ripples, stopIndex } = this.state;
    this.setState({
      stopIndex: 0,
      ripples: ripples.slice(stopIndex)
    });
  }

  render() {
    const { className } = this.props;
    const { ripples, stopIndex } = this.state;
    return (
      <TouchRippleBaseStyledComponet className={className}>
        {ripples.map(({ rippleSize, rippleY, rippleX, key }, index) => {
          return (
            <RippleBaseStyledComponet key={`$${key}`} rippleSize={rippleSize} rippleY={rippleY} rippleX={rippleX} pulsate={false} visible>
              <RippleChildBaseStyledComponet pulsate={false} leaving={index < stopIndex} />
            </RippleBaseStyledComponet>
          );
        })}
      </TouchRippleBaseStyledComponet>
    );
  }
}

export default TouchRipple;
