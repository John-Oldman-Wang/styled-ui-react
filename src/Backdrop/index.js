import React from 'react';
import PropTypes from 'prop-types';
import Fade from '../Fade';

import styled from 'styled-components';

const BackdropBaseComponet = styled(Fade)`
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
class Backdrop extends React.PureComponent {
  render() {
    const { open, transitionDuration, ...other } = this.props;
    return (
      <BackdropBaseComponet in={open} timeout={transitionDuration} {...other}>
        <div data-mui-test="Backdrop" aria-hidden="true" />
      </BackdropBaseComponet>
    );
  }
}

Backdrop.propTypes = {
  className: PropTypes.string,
  invisible: PropTypes.bool,
  open: PropTypes.bool.isRequired,
  transitionDuration: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({ enter: PropTypes.number, exit: PropTypes.number })])
};

Backdrop.defaultProps = {
  invisible: false
};

export default Backdrop;
