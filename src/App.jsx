import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import PasswordGenerator from './components/PasswordGenerator';

function App() {
  return (
    <Router>
      <div className="App">
        <PasswordGenerator />
      </div>
    </Router>
  );
}

export default App;
