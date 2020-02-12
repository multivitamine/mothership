import React from 'react';

import { StyledBody } from '../styled-components' 

function HomeText(props) {
    const releaseList = props.releases.map((release) => {
    return <tr><td>{release.name}</td><td>{release.version}</td><td>{release.dependentVersion}</td></tr>
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
                        <th>Dependent version</th>
                    </tr>
                    {releaseList}
                </tbody>
            </table>
            <p> Get request: </p>
            <p> /api/releases </p>
            
        </StyledBody>
    </React.Fragment>
  );
}

export default HomeText;