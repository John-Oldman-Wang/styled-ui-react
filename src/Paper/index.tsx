import React from 'react';
import styled from 'styled-components';
import theme from '../defaultThemes';

interface PaperBaseStyledComponentProps {
  square?: boolean;
  elevation: number;
  ref?: React.Ref<{}>;
}

export const PaperBaseStyledComponent = styled(React.Fragment)<PaperBaseStyledComponentProps>`
  background-color: #fff;
  box-shadow: ${({ elevation }) => `${theme.shadows[elevation]}`};
  ${({ square }) => (!square ? 'border-radius:4px' : '')};
`;

interface PaperProps extends PaperBaseStyledComponentProps {
  component?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
}

const Paper = React.forwardRef(function(props: PaperProps, ref) {
  const { component, ...other } = props;
  return <PaperBaseStyledComponent as={component} ref={ref} {...other} />;
});

Paper.defaultProps = {
  component: 'div',
  elevation: 2,
  square: false
};

export default Paper;
