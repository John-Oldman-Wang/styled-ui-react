import React from 'react';
import styled, { css } from 'styled-components';
import theme from '../defaultThemes';
import ButtonBase from '../ButtonBase';

const BottomNavigationActionSelect = css`
  padding-top: 6px;
  color: ${theme.palette.primary.main};
`;

const BottomNavigationActionIconMobility = css`
  padding-top: 16px;
`;

interface BottomNavigationActionBaseComponentProps {
  selected: boolean;
  iconMobility: boolean;
}

const BottomNavigationActionBaseComponent = styled(ButtonBase)<BottomNavigationActionBaseComponentProps>`
  transition: ${theme.transitions.create(['color', 'padding-top'], { duration: theme.transitions.duration.short })};
  padding: 6px 12px 8px;
  min-width: 80px;
  max-width: 168px;
  color: ${theme.palette.text.secondary};
  flex: 1;
  ${({ selected }) => (selected ? BottomNavigationActionSelect : '')}
  ${({ iconMobility }) => (iconMobility ? BottomNavigationActionIconMobility : '')}
`;

const BottomNavigationActionWrapComponent = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-direction: column;
`;

const BottomNavigationActionLabelSelected = css`
  font-size: ${theme.typography.pxToRem(14)};
`;

const BottomNavigationActionLabelIconMobility = css`
  opacity: 0;
  transition-delay: 0s;
`;

interface BottomNavigationActionLabelComponentProps {
  selected: boolean;
  iconMobility: boolean;
}

const BottomNavigationActionLabelComponent = styled.span<BottomNavigationActionLabelComponentProps>`
  font-family: ${theme.typography.fontFamily};
  font-size: ${theme.typography.pxToRem(12)};
  opacity: 1;
  transition: font-size 0.2s, opacity 0.2s;
  transition-delay: 0.1s;
  ${({ selected }) => (selected ? BottomNavigationActionLabelSelected : '')}
  ${({ iconMobility }) => (iconMobility ? BottomNavigationActionLabelIconMobility : '')}
`;

interface BottomNavigationActionProps {
  className?: string;
  icon?: JSX.Element;
  label?: React.ReactNode;
  value?: any;
  selected?: boolean;
  showLabel?: boolean;
  onChange?: (event: any, value: any) => void;
  onClick?: (event: any) => void;
}

class BottomNavigationAction extends React.Component<BottomNavigationActionProps> {
  handleChange = (event: any) => {
    const { onChange, value, onClick } = this.props;

    if (onChange) {
      onChange(event, value);
    }

    if (onClick) {
      onClick(event);
    }
  };

  render() {
    const { icon, label, onChange, onClick, selected, showLabel, ...other } = this.props;
    return (
      <BottomNavigationActionBaseComponent
        selected={!!selected}
        iconMobility={!showLabel && !selected}
        onClick={(e: any) => {
          this.handleChange(e);
        }}
        {...other}>
        <BottomNavigationActionWrapComponent>
          {icon}
          <BottomNavigationActionLabelComponent selected={!!selected} iconMobility={!showLabel && !selected}>
            {label}
          </BottomNavigationActionLabelComponent>
        </BottomNavigationActionWrapComponent>
      </BottomNavigationActionBaseComponent>
    );
  }
}

export default BottomNavigationAction;
