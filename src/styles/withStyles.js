import React from 'react';
import theme from '../theme';
export default function(styleFn) {
  const classes = styleFn(theme);
  console.log({
    classes
  });
  return (Com) => {
    return (props) => <Com {...props} classes={classes} />;
  };
}
