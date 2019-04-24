import React from 'react';
import styled from 'styled-components';

const CardContentBaseStyledComponet = styled(React.Fragment)`
  padding: 16px;
  &:last-child {
    padding-bottom: 24px;
  }
`;

interface CardContentAttr {
  component?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
  children?: React.ReactNode | React.ReactNodeArray;
}

export type CardContentProps = React.HTMLAttributes<HTMLDivElement> & CardContentAttr;

const CardContent: React.StatelessComponent<CardContentProps> = function(props) {
  const { component, ...other } = props;
  return <CardContentBaseStyledComponet as={component} {...other} />;
};

CardContent.defaultProps = {
  component: 'div'
};

export default CardContent;
