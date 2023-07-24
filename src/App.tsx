import React from 'react';
import logo from './logo.svg';
import './App.css';
import AddMember from './AddMember';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';




function App() {
  return (
    <BrowserRouter>
    <div className='app'>
      {
        <Routes>
            <Route path="/" element={<AddMember />} />
        </Routes>
      }
    </div>
    </BrowserRouter>


  );
}

export default App;
