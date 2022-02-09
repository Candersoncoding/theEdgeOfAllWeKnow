import React, {useEffect, useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Router} from '@reach/router';
import Main from './views/Main.jsx';


function App() {
  // useEffect(()=> {

  // })

  const styleHeader = {
    height: "200px",
    backgroundColor: "#242424",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: "20px",
    margin: "0px"
  }

  const asideNavbar = {
    width: "25%",
    backgroundColor: "#56585d",
    height: "auto",
    color: "white",
    padding: "25px"
  }

  const bodyStyling = {
    backgroundColor: "#a7a7a7",
    minHeight: "100vh",
    height: "auto",
    width: "75%"
  }

  return (
    <div className="App">

        <Router>
          <Main path={"/"} styleHeader={styleHeader} navBar={asideNavbar} bodyStyling={bodyStyling}/>
        </Router>

    </div>
  );
}

export default App;
