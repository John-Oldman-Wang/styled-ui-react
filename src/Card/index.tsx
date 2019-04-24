import React from 'react';
import styled from 'styled-components';
import Paper, { PaperProps } from '../Paper/index';

const CardBaseStyledComponent = styled(Paper)`
  overflow: hidden;
`;

interface CardProps extends PaperProps {
  raised?: boolean;
}

const Card: React.StatelessComponent<CardProps> = function(props) {
  const { raised = false, ...other } = props;
  return <CardBaseStyledComponent component="div" elevation={raised ? 8 : 1} {...other} />;
};

export default Card;
