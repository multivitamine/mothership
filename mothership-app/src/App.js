import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

//components
import Header from './components/header';
import HomeText from './components/homeText';
import Releases from './components/releases';
import Errorlogs from './components/errorlogs';


//styles
import { StyledHeaderContainer, StyledNavContainer, StyledLi, StyledUl, StyledBody } from './styled-components' 

//constants
import { API_ROOT } from "./constants/endpoints";

function App(props) {

  const [releases, setReleases] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    async function fetchReleases() {
      const response = await fetch(`${API_ROOT}releases`);
      const json = await response.json();
      
      setReleases(json);
    }

    fetchReleases();
    
  }, releases);
 

  useEffect(() => {
    async function fetchErrors() {
      const response = await fetch(`${API_ROOT}errorlogging`);
      const json = await response.json();
      
      setErrors(json);
    }

    fetchErrors();
    
  }, errors);
 
  return (

    <Router>
      <StyledHeaderContainer>
      <StyledNavContainer>
        <StyledUl>
          <StyledLi><Header title={<Link to={`/`}>Home</Link>}></Header></StyledLi>
          <StyledLi><Header title={<Link to={`/releases`}>Releases</Link>}></Header></StyledLi>
          <StyledLi><Header title={<Link to={`/errorlogs`}>Errorlogs</Link>}></Header></StyledLi>
        </StyledUl>
      </StyledNavContainer>
      
      <StyledBody>
        <Route path="/" exact  component={HomeText} />
        <Route path="/releases" component={() => <Releases releases={releases} />} />
        <Route path="/errorlogs" component={() => <Errorlogs errors={errors} />} />
      </StyledBody>
    </StyledHeaderContainer>
  </Router>

  );
}

export default App;

