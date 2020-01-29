import React from 'react';

import { Link } from "react-router-dom";
import { StyledBody, StyledLogTD } from '../styled-components' 

function Errorlogs(props) {
    
    const errorList = props.errorlogs.map((error) => {
    const splitLogs = error.split('.json');
    const logname = splitLogs[0];
    return <tr key={logname}><StyledLogTD><Link to={`/errorlogs/${logname}`}>{logname}</Link></StyledLogTD></tr>
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
            
            <table>
                <tbody>
                    <tr>
                        <th>Log dates</th>
                    </tr>
                    {errorList}
                </tbody>
            </table>
            <p> Get request: </p>
            <p> /api/errorlogging </p>
            <p>Om een project te kunnen loggen moet er ergens in je javascript dit worden toegevoegd</p>
            
            <p style={{padding: '20px 0px'}}>
                    {codeBlock}
            </p>
        </StyledBody>
    </React.Fragment>
  );
}

export default Errorlogs;