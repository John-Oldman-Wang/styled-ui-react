import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from '../theme';
export const PaperBaseStyledComponent = styled(React.Fragment)`
  background-color: #fff;
  box-shadow: ${({ elevation }) => `${theme.shadows[elevation]}`};
  ${({ square }) => (!square ? 'border-radius:4px' : '')};
`;

const Paper = React.forwardRef(function Paper(props, ref) {
  return <PaperBaseStyledComponent as={props.component} {...props} ref={ref} />;
});

Paper.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  component: PropTypes.elementType,
  elevation: PropTypes.number,
  square: PropTypes.bool
};

Paper.defaultProps = {
  component: 'div',
  elevation: 2,
  square: false
};

export default Paper;
