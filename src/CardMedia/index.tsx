import React from 'react';
import styled, { css } from 'styled-components';

const MediaCss = css`
  width: 100%;
  object-fit: cover;
`;

interface CardMediaBaseStyledComponentProps {
  isMediaComponent?: boolean;
  ref?: React.Ref<{}>;
  src?: String;
  image?: String;
}

const CardMediaBaseStyledComponent = styled(React.Fragment)<CardMediaBaseStyledComponentProps>`
  display: block;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  ${({ image }) => (image ? `background-image: url("${image}");` : '')}
  ${({ isMediaComponent }) => (isMediaComponent ? MediaCss : '')}
`;

const MEDIA_COMPONENTS = ['video', 'audio', 'picture', 'iframe', 'img'];

type CardMediaAttr = {
  image?: String;
  src?: String;
  component?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
} & CardMediaBaseStyledComponentProps;

export type CardMediaProps = React.HTMLAttributes<HTMLDivElement> & CardMediaAttr;

const CardMedia: React.ForwardRefExoticComponent<CardMediaProps> = React.forwardRef(function CardMedia(props, ref) {
  const { component = 'div', image, src, ...other } = props;
  if (!image && !src) {
    console.error('Warning: @styled-ui: either `image` or `src` property must be specified.');
  }
  const isMediaComponent = typeof component === 'string' && MEDIA_COMPONENTS.indexOf(component) !== -1;
  return (
    <CardMediaBaseStyledComponent
      as={component}
      isMediaComponent={isMediaComponent}
      image={!isMediaComponent ? image : undefined}
      ref={ref}
      src={isMediaComponent ? image || src : undefined}
      {...other}
    />
  );
});

export default CardMedia;
