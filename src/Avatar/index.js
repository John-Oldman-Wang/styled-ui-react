import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import theme from '../theme';

const complexMixin = css`
  color: ${theme.palette.background.default};
  background-color: ${theme.palette.type === 'light' ? theme.palette.grey[400] : theme.palette.grey[600]};
`;

const AvatarBaseStyledComponent = styled(React.Fragment)`
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

const Avatar = React.forwardRef(function Avatar(props, ref) {
  const {
    alt,
    children: childrenProp,
    childrenClassName: childrenClassNameProp,
    classes,
    className: classNameProp,
    component: Component,
    imgProps,
    sizes,
    src,
    srcSet,
    ...other
  } = props;
  let children = null;
  const img = src || srcSet;
  if (img) {
    children = <AvatarImg alt={alt} src={src} srcSet={srcSet} sizes={sizes} {...imgProps} />;
  } else if (childrenClassNameProp && React.isValidElement(childrenProp)) {
    children = React.cloneElement(childrenProp, {
      className: [...new Set(...(childrenClassNameProp + '').split(' '), ...(childrenProp.props.className + '').split(' '))].join(' ')
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

Avatar.propTypes = {
  alt: PropTypes.string,
  children: PropTypes.node,
  childrenClassName: PropTypes.string,
  className: PropTypes.string,
  component: PropTypes.elementType,
  imgProps: PropTypes.object,
  sizes: PropTypes.string,
  size: PropTypes.number,
  src: PropTypes.string,
  srcSet: PropTypes.string
};

Avatar.defaultProps = {
  component: 'div',
  size: 40
};

export default Avatar;
