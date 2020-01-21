import React from 'react';

function Header(props) {
    return (
    <React.Fragment>
        {props.small ? <h3>{props.title}</h3> : <h2 style={{fontSize: '2rem'}}>{props.title}</h2> }
        
    </React.Fragment>
  ); 
}

export default Header;