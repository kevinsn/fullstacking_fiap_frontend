import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import AppRoutes from './routes';
import './App.css';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <BrowserRouter >
      <Header />
      <Container data-bs-theme='dark'>
        <AppRoutes />
      </Container >
    </BrowserRouter >
  );
}

export default App;