import React from 'react';

import { StyledBody } from '../styled-components' 

function HomeText(props) {

    return (
    <React.Fragment>
        <StyledBody>
            <h1>MOTHERSHIP</h1>
            <p>The mothership, verzamelplek van verschillende CMS apis die gedeeld worden door alle websites.</p>
        </StyledBody>
    </React.Fragment>
  );
}

export default HomeText;