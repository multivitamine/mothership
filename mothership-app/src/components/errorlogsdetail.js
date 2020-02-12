import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";

import { StyledBody } from '../styled-components' 

//constants
import { API_ROOT } from "../constants/endpoints";

function ErrorlogsDetail(props) {
    console.log(props);
  const [errors, setErrors] = useState([]);
  
  useEffect(() => {
    async function fetchErrors() {
      const response = await fetch(`${API_ROOT}errorlogging/${props.match.params.date}`);
      const json = await response.json();
      
      setErrors(json);
    }
    setInterval(() => {
      
    fetchErrors();
    }, 5000);
    
  }, errors);


    const errorList = errors.map((error, index) => {
    return <tr key={index}><td>{error.msg}</td><td>{error.realUrl}</td><td>{error.dateCreated}</td></tr>
    });

    return (
    <React.Fragment>
        <StyledBody>
            <h1>Errorlogs</h1>
            <p>Een overzicht van de errors in alle projecten die CMS 6.3.0 of hoger hebben.</p>
            
            <table>
                <tbody>
                    <tr>
                        <th>Error message</th>
                        <th>url</th>
                        <th>datetime</th>
                    </tr>
                    {errorList}
                </tbody>
            </table>
            <p> Get request: </p>
            <p> /api/errorlogging/:date </p>
            <p> Param date: day-month-year / 20-1-2020 </p>
            
        </StyledBody>
    </React.Fragment>
  );
}

export default withRouter(ErrorlogsDetail);