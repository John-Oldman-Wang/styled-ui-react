import React from 'react';
import styled from 'styled-components';
import theme from '../defaultThemes';

interface PaperBaseStyledComponentProps {
  square?: boolean;
  elevation?: number;
  ref?: React.Ref<{}>;
}

export const PaperBaseStyledComponent = styled(React.Fragment)<PaperBaseStyledComponentProps>`
  background-color: #fff;
  box-shadow: ${({ elevation = 2 }) => `${theme.shadows[elevation]}`};
  ${({ square }) => (!square ? 'border-radius:4px' : '')};
`;

// export type Omit<T, K extends keyof any> = T extends any ? Pick<T, Exclude<keyof T, K>> : never;
// export type StandardProps<C, ClassKey extends string, Removals extends keyof C = never> = Omit<C, 'classes' | Removals>
interface PaperPropAttr extends PaperBaseStyledComponentProps {
  component?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
}

export type PaperProps = React.HTMLAttributes<HTMLDivElement> & PaperPropAttr;

const Paper: React.ComponentType<PaperProps> = React.forwardRef(function(props: PaperProps, ref) {
  const { component, ...other } = props;
  return <PaperBaseStyledComponent as={component} ref={ref} {...other} />;
});

Paper.defaultProps = {
  component: 'div',
  elevation: 2,
  square: false
};

export default Paper;
