//imports external
import React, { Component } from 'react';

class FlexItem extends Component {
  getMargins(margin) {
    switch (margin) {
      case 'small':
        return { marginLeft: '10px', marginRight: '10px' };

      default:
        return;
    }
  }
  render() {
    const { margin, flex, style, children, direction, display } = this.props;
    const styles = {};
    const flexStyle = flex ? flex : {};

    styles.flex = flexStyle;
    styles.flexDirection = direction;
    styles.display = display;

    return <div style={{ ...styles, ...this.getMargins(margin), ...style }}>{children}</div>;
  }
}

export default FlexItem;
