import React from 'react';

import { StyledBody } from '../styled-components' 

function Errorlogs(props) {
    const releaseList = props.errors.map((error) => {
    return <tr><td>{error.msg}</td><td>{error.realUrl}</td><td>{error.dateCreated}</td></tr>
    });
    const codeBlock = 'window.onerror = async function(msg, url, line) {' +
                        'await fetch("https://mothership.pangaeatest.nl/api/errorlogging", {' +
                        'method: "POST",' +
                        'body: JSON.stringify({ msg: msg, url, line }),' +
                        'headers: { "Content-Type": "application/json" },' +
                    '});' + 
                    '};';
    return (
    <React.Fragment>
        <StyledBody>
            <h1>Errorlogs</h1>
            <p>Een overzicht van de errors in alle projecten die CMS 6.3.0 of hoger hebben.</p>
            
            <p> Get request: </p>
            <p> /api/errorlogging </p>
            <p>Om een project te kunnen loggen moet er ergens in je javascript dit worden toegevoegd</p>
            
            <p style={{padding: '20px 0px'}}>
                    {codeBlock}
            </p>
            <table>
                <tbody>
                    <tr>
                        <th>Error message</th>
                        <th>url</th>
                        <th>datetime</th>
                    </tr>
                    {releaseList}
                </tbody>
            </table>
            
        </StyledBody>
    </React.Fragment>
  );
}

export default Errorlogs;