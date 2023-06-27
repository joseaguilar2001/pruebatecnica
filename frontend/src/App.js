import logo from './logo.svg';
import './App.css';
import React from 'react';
import Personas from "./screens/personasScreen";
import { Routes, Route} from 'react-router';
function App() {
  return (
    <div className = "App">
      <div className="container mt-3">
        <Routes>
          <Route index path="/" element={<Personas />}/>
          <Route index path="/personas" element={<Personas />}/>
        </Routes>
      
    </div>
    </div>
  );
}

export default App;
