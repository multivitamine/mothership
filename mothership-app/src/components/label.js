import React from 'react';

function Label(props) {
    const { fontWeight } = props;
    const style = {}
    style.fontWeight = fontWeight;
    return (
    <React.Fragment>
      <label style={{...style}}>{props.text}</label>
    </React.Fragment>
  ); 
}

export default Label;