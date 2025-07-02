import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './views/Main.jsx';
import PlanetDetails from './views/PlanetDetails';


function App() {

  const styleHeader = {
    height: "200px",
    backgroundColor: "#212529",
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

        <Routes>
          <Route path={"/"} element={<Main styleHeader={styleHeader} navBar={asideNavbar} bodyStyling={bodyStyling} />} />
          <Route path={`/:id/details`} element={<PlanetDetails styleHeader={styleHeader} navBar={asideNavbar} bodyStyling={bodyStyling}/>} />
        </Routes>

    </div>
  );
}

export default App;
