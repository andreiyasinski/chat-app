import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import Join from '../join/join';
import Chat from '../chat/chat';

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Roboto', sans-serif;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  
  #root {
    min-height: 100vh;
  }
`

const App = () => (
  <React.Fragment>
    <GlobalStyle />
    <Router>
      <Route path="/" exact component={Join} />
      <Route path="/chat" component={Chat} />
    </Router>
  </React.Fragment>
)

export default App;
