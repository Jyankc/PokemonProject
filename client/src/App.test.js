import { render, screen } from '@testing-library/react';
import App from './App';
import Filtering from './components/Filtering';
import { Provider } from "react-redux";
import React from 'react';
import './index.css';
import { MemoryRouter ,BrowserRouter, Route} from "react-router-dom";

 


// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
test('renders learn react link', () => {
  render(<Filtering />);
  screen.getByText('WELCOME!')
})

