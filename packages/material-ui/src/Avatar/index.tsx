import React from 'react';
import styled, { css } from 'styled-components';
import theme from '../defaultThemes';
const complexMixin = css`
  color: ${theme.palette.background.default};
  background-color: ${theme.palette.type === 'light' ? theme.palette.grey[400] : theme.palette.grey[600]};
`;

interface AvatarBaseStyledComponentProps {
  size: number;
  src?: string;
  srcSet?: string;
  ref?: React.Ref<{}>;
  children?: JSX.Element;
}

const AvatarBaseStyledComponent = styled(React.Fragment)<AvatarBaseStyledComponentProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  font-family: ${theme.typography.fontFamily};
  font-size: ${theme.typography.pxToRem(20)};
  border-radius: 50%;
  overflow: hidden;
  user-select: none;
  ${({ src, srcSet }) => (src || srcSet ? complexMixin : '')}
`;

const AvatarImg = styled.img`
  width: 100%;
  height: 100%;
  text-align: center;
  object-fit: cover;
`;

interface AvatarProps {
  alt?: string;
  children: JSX.Element | React.ReactElement<{ className: string }>;
  childrenClassName?: string;
  className?: string;
  component?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
  imgProps?: object;
  sizes?: string;
  size: number;
  src?: string;
  srcSet?: string;
}

const Avatar = React.forwardRef(function(props: AvatarProps, ref) {
  const {
    alt,
    children: childrenProp,
    childrenClassName: childrenClassNameProp,
    className: classNameProp,
    component: Component,
    imgProps,
    sizes,
    src,
    srcSet,
    ...other
  } = props;
  let children: JSX.Element;
  const img = src || srcSet;
  if (img) {
    children = <AvatarImg alt={alt} src={src} srcSet={srcSet} sizes={sizes} {...imgProps} />;
  } else if (childrenClassNameProp && React.isValidElement(childrenProp)) {
    children = React.cloneElement(childrenProp, {
      className: [...new Set((childrenClassNameProp + '').split(' ').concat((childrenProp.props.className + '').split(' ')))].join(' ')
    });
  } else {
    children = childrenProp;
  }
  return (
    <AvatarBaseStyledComponent as={props.component} ref={ref} {...other}>
      {children}
    </AvatarBaseStyledComponent>
  );
});

Avatar.defaultProps = {
  component: 'div',
  size: 40
};

export default Avatar;
