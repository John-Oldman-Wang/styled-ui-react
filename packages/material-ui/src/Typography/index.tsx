import React from 'react';
import styled, { css } from 'styled-components';

import { primary, secondary, error, text } from '../colors/index';

type TypographyColor = 'initial' | 'error' | 'inherit' | 'primary' | 'secondary' | 'textPrimary' | 'textSecondary';

const colorMap = {
  primary: primary.main,
  secondary: secondary.main,
  error: error.main,
  textPrimary: text.primary,
  textSecondary: text.secondary,
  inherit: 'inherit'
};

const TypographyColor = (color: TypographyColor) => css`
  ${color === 'initial' ? '' : `color: ${colorMap[color]};`}
`;

const TypographyColorFontFamily = css`
  color: rgba(0, 0, 0, 0.87);
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-weight: 400;
`;

const TypographyBody2 = css`
  ${TypographyColorFontFamily}
  font-size: 0.875rem;
  letter-spacing: 0.01071em;
  line-height: 1.5;
`;

const TypographyBody1 = css`
  ${TypographyColorFontFamily}
  font-size: 1rem;
  letter-spacing: 0.00938em;
  line-height: 1.5;
`;

const TypographyCaption = css`
  ${TypographyColorFontFamily}
  font-size: 0.75rem;
  letter-spacing: 0.03333em;
  line-height: 1.66;
`;

const TypographyButton = css`
  ${TypographyColorFontFamily}
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.02857em;
  line-height: 1.75;
  text-transform: uppercase;
`;

const TypographyH1 = css`
  ${TypographyColorFontFamily}
  font-size: 6rem;
  font-weight: 300;
  letter-spacing: -0.01562em;
  line-height: 1;
`;

const TypographyH2 = css`
  ${TypographyColorFontFamily}
  font-size: 3.75rem;
  font-weight: 300;
  letter-spacing: -0.00833em;
  line-height: 1;
`;

const TypographyH3 = css`
  ${TypographyColorFontFamily}
  font-size: 3rem;
  font-weight: 400;
  letter-spacing: 0em;
  line-height: 1.04;
`;

const TypographyH4 = css`
  ${TypographyColorFontFamily}
  font-size: 2.125rem;
  font-weight: 400;
  letter-spacing: 0.00735em;
  line-height: 1.17;
`;

const TypographyH5 = css`
  ${TypographyColorFontFamily}
  font-size: 1.5rem;
  font-weight: 400;
  letter-spacing: 0em;
  line-height: 1.33;
`;

const TypographyH6 = css`
  ${TypographyColorFontFamily}
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: 0.0075em;
  line-height: 1.6;
`;

const TypographySubtitle1 = css`
  ${TypographyColorFontFamily}
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 0.00938em;
  line-height: 1.75;
`;

const TypographySubtitle2 = css`
  ${TypographyColorFontFamily}
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.00714em;
  line-height: 1.57;
`;

const TypographyOverline = css`
  ${TypographyColorFontFamily}
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.08333em;
  line-height: 2.66;
  text-transform: uppercase;
`;

const TypographySrOnly = css`
  position: absolute;
  height: 1px;
  width: 1px;
  overflow: hidden;
`;

const variantMap = {
  h1: TypographyH1,
  h2: TypographyH2,
  h3: TypographyH3,
  h4: TypographyH4,
  h5: TypographyH5,
  h6: TypographyH6,
  subtitle1: TypographySubtitle1,
  subtitle2: TypographySubtitle2,
  body1: TypographyBody1,
  body2: TypographyBody2,
  caption: TypographyCaption,
  button: TypographyButton,
  overline: TypographyOverline,
  srOnly: TypographySrOnly,
  inherit: css``
};

type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'button'
  | 'overline'
  | 'srOnly'
  | 'inherit';

const TypographyVariant = (variant: TypographyVariant) => {
  return variantMap[variant];
};

const TypographyNoWrap = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

interface TypographyBaseStyledComponentProps {
  align: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  color: TypographyColor;
  variant: TypographyVariant;
  gutterBottom: boolean;
  paragraph: boolean;
  noWrap: boolean;
  display: 'initial' | 'inline' | 'block';
}

const TypographyBaseStyledComponent = styled(React.Fragment)<TypographyBaseStyledComponentProps>`
  margin: 0;
  text-align: ${({ align }) => align};
  ${({ color }) => TypographyColor(color)}
  ${({ variant }) => TypographyVariant(variant)}
  ${({ gutterBottom }) => (gutterBottom ? 'margin-bottom: 0.35em;' : '')}
  ${({ paragraph }) => (paragraph ? 'margin-bottom: 16px' : '')}
  ${({ noWrap }) => (noWrap ? TypographyNoWrap : '')}
  ${({ display }) => (display === 'initial' ? '' : `display: ${display}`)}
`;

const defaultVariantMapping = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtitle1: 'h6',
  subtitle2: 'h6',
  body1: 'p',
  body2: 'p',
  caption: 'span',
  button: 'span',
  overline: 'span',
  srOnly: 'span',
  inherit: 'span'
};

interface TypographyProps {
  align: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  color: TypographyColor;
  variant: TypographyVariant;
  component: keyof JSX.IntrinsicElements | React.ComponentType<any>;
  gutterBottom: boolean;
  display: 'initial' | 'inline' | 'block';
  internalDeprecatedVariant: boolean;
  noWrap: boolean;
  paragraph: boolean;
}

const Typography: React.StatelessComponent<TypographyProps> = function(props) {
  const {
    align,
    color,
    component: componentProp,
    gutterBottom,
    display,
    internalDeprecatedVariant,
    noWrap,
    paragraph,
    variant,
    ...other
  } = props;
  const Component = componentProp || (paragraph ? 'p' : defaultVariantMapping[variant] || 'span');

  return (
    <TypographyBaseStyledComponent
      display={display}
      noWrap={noWrap}
      paragraph={paragraph}
      gutterBottom={gutterBottom}
      variant={variant}
      color={color}
      align={align}
      as={Component}
      {...other}
    />
  );
};

Typography.defaultProps = {
  align: 'inherit',
  color: 'initial',
  display: 'initial',
  gutterBottom: false,
  noWrap: false,
  paragraph: false,
  variant: 'body1'
};

export default Typography;
