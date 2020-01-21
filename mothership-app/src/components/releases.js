import React from 'react';

import { StyledBody } from '../styled-components' 

function HomeText(props) {
    const releaseList = props.releases.map((release) => {
    return <React.Fragment><td>{release.name}</td><td>{release.version}</td></React.Fragment>
    });
    return (
    <React.Fragment>
        <StyledBody>
            <h1>Releases</h1>
            <p>Een overzicht van projecten met hun latest release en versie nummer.</p>
            <table>
                <tbody>
                    <tr>
                        <th>Releasenaam</th>
                        <th>Versienummer</th>
                     
                    </tr>
                    <tr>{releaseList}</tr>
                </tbody>
            </table>
        </StyledBody>
    </React.Fragment>
  );
}

export default HomeText;