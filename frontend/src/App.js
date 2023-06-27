import './App.css';
import React from 'react';
import Personas from "./screens/personasScreen";
import "./App.css";
import 'primereact/resources/primereact.min.css';
import { Routes, Route } from 'react-router';
import Navigation from "./components/Navigate";
function App() {
  return (
    <div className = "App">
      <Navigation />
      
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
