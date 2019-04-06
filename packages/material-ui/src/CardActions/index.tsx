import React from 'react';
import styled from 'styled-components';

interface CardActionsBaseStyledComponent {
  disableActionSpacing: boolean;
}

const CardActionsBaseStyledComponent = styled.div<CardActionsBaseStyledComponent>`
  padding: ${({ disableActionSpacing }) => (disableActionSpacing ? '8px' : '8px 4px')};
  display: flex;
  align-items: center;
  box-sizing: border-box;
`;

const CardActionDisableActions = styled(React.Fragment)`
  margin: 0px 4px;
`;

interface CardActionsProps {
  disableActionSpacing: boolean;
  children: React.ReactNode | React.ReactNodeArray;
}

const CardActions: React.StatelessComponent<CardActionsProps> = function(props: CardActionsProps) {
  const { disableActionSpacing, children, ...other } = props;
  return (
    <CardActionsBaseStyledComponent disableActionSpacing={disableActionSpacing} {...other}>
      {disableActionSpacing
        ? children
        : React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              const Component = (props: any) => React.cloneElement(child, props);
              return <CardActionDisableActions as={Component} />;
            }
          })}
    </CardActionsBaseStyledComponent>
  );
};

CardActions.defaultProps = {
  disableActionSpacing: false
};

export default CardActions;
