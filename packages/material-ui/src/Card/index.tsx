import React from 'react';
import styled from 'styled-components';
import Paper from '../Paper/index';

const CardBaseStyledComponent = styled(Paper)`
  overflow: hidden;
`;

interface CardProps {
  raised: boolean;
}

const Card: React.StatelessComponent<CardProps> = function(props) {
  const { raised, ...other } = props;
  return <CardBaseStyledComponent component="div" elevation={raised ? 8 : 1} {...other} />;
};

Card.defaultProps = {
  raised: false
};

export default Card;
