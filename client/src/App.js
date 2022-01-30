import React, {useEffect, useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Router} from '@reach/router';
import Main from './views/Main.jsx';
import HeadingStyle from './components/HeadingStyle.jsx';

function App() {
  // useEffect(()=> {

  // })
  return (
    <div className="App">
        <Router>
          <Main path={"/"} />
        </Router>
    </div>
  );
}

export default App;
