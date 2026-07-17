import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// pk_test_51.. is a public key from Stripe Dashboard
const stripePromise = loadStripe('pk_test_51TcQtZ38slKHdWiFnL60C4m3We4js4koRD1plmBYcjiQ70Z9bxvpFVndRpQ3XMSldKrT6vorQZYVHQtvCbTcv7kR00RDGEwpgF');

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </BrowserRouter>
);