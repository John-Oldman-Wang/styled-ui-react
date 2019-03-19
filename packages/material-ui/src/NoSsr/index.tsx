import React from 'react';

interface NoSSRState {
  mounted: boolean;
}

export default class NoSSR extends React.Component<any, NoSSRState> {
  static defaultProps = {
    defer: false,
    fallback: null
  };
  mounted: boolean = false;

  state = {
    mounted: false
  };

  render() {
    const { children, fallback } = this.props;

    return this.state.mounted ? children : fallback;
  }

  componentDidMount() {
    this.mounted = true;

    if (this.props.defer) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (this.mounted) {
            this.setState({ mounted: true });
          }
        });
      });
    } else {
      this.setState({ mounted: true });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }
}
