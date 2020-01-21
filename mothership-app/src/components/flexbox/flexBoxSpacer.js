//imports external
import React, { Component } from 'react';

class FlexBoxSpacer extends Component {
  render() {
    const { grow, style, children } = this.props;
    const styles = {};
    const growStyle = grow ? grow : 1;

    styles.flexGrow = growStyle;

    return <div style={{ ...styles, ...style }}>{children}</div>;
  }
}

export default FlexBoxSpacer;
