import React from 'react';
import styled from 'styled-components';
import ButtonBase from '../ButtonBase';
import theme from '../defaultThemes';

const CardActionAreaFocusHighlightClassName = btoa(String(Math.floor(Math.random() * 1000000)));

const CardActionAreaFocusHighlight = styled.span`
  pointer-events: none;
  position: absolute;
  background-color: currentcolor;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0;
  transition: ${theme.transitions.create('opacity', { duration: theme.transitions.duration.short })};
`;

const CardActionAreaBaseStyledComponent = styled(ButtonBase)`
  display: block;
  text-align: inherit;
  width: 100%;
  &:hover .${CardActionAreaFocusHighlightClassName} {
    opacity: ${theme.palette.action.hoverOpacity};
  }
`;

const CardActionArea: React.StatelessComponent<{}> = function(props) {
  const { children, ...other } = props;
  return (
    <CardActionAreaBaseStyledComponent {...other}>
      {children}
      <CardActionAreaFocusHighlight className={CardActionAreaFocusHighlightClassName} />
    </CardActionAreaBaseStyledComponent>
  );
};

export default CardActionArea;
