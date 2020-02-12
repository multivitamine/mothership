import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import io from "socket.io-client";
//components
import Header from './components/header';
import HomeText from './components/homeText';
import Releases from './components/releases';
import ErrorlogsDetail from './components/errorlogsdetail';
import Errorlogs from './components/errorlogs';


//styles
import { StyledHeaderContainer, StyledNavContainer, StyledLi, StyledUl, StyledBody } from './styled-components' 

//constants
import { API_ROOT } from "./constants/endpoints";

let socket;
const endpoint = 'http://localhost:3002';
socket = io(endpoint)
function subscribeToTimer(interval, cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', 1000);
} 
// function getAllConnectedProjects(cb) {
//   socket.on("sendConnectedUsers", users => cb(null, users));
// } 
function App(props) {

  const [releases, setReleases] = useState([]);
  const [errorlogs, setErrorlogs] = useState([]);
  const [timestamp, setTimestamp] = useState('');
  const [projectUsers, setConnectedUsers] = useState('');
 
  useEffect(() => {
    
    socket.on("sendConnectedUsers",  users => { 
      console.log('sendConnectedUsers');
      
      setConnectedUsers(users);
    });

    //subscribeToTimer(100, (err, timestamp) => setTimestamp(timestamp));
    //getAllConnectedProjects((users) => setConnectedUsers(users))

    console.log(projectUsers, 'projectUsers');
  }, [projectUsers]);
  
  // useEffect(() => {
  //   async function fetchReleases() {
  //     const response = await fetch(`${API_ROOT}releases`);
  //     const json = await response.json();
      
  //     setReleases(json);
  //   }

  //   fetchReleases();
    
  // }, releases);
 

  useEffect(() => {
    async function fetchErrors() {
      const response = await fetch(`${API_ROOT}errorlogging`);
      const json = await response.json();
      
      setErrorlogs(json);
    }
    
    fetchErrors();
    
  }, []);

  const users = projectUsers.length > 0 ? projectUsers[0].count : 0;
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
      <div>
        <p >
          Total users connected {users}
        </p>
      </div>
        <Route path="/" exact  component={HomeText} />
        <Route path="/releases" component={() => <Releases releases={releases} />} />
        <Route path="/errorlogs" exact component={() => <Errorlogs errorlogs={errorlogs} />} />
        <Route path="/errorlogs/:date" exact component={() => <ErrorlogsDetail />} />
      </StyledBody>
    </StyledHeaderContainer>
  </Router>

  );
}

export default App;

