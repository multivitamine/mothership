//imports external
import React, { Component } from 'react';

class FlexBoxContainer extends Component {
  render() {
    const { props } = this;
    const { children, style, direction, justify, align } = props;
    const styles = {};

    styles.display = 'flex';
    styles.paddingTop = '15px';
    styles.flexDirection = direction;
    styles.justifyContent = justify;
    styles.alignItems = align;

    return <div style={{ ...styles, ...style }}>{children}</div>;
  }
}

export default FlexBoxContainer;
