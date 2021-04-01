/* react imports */
import React from 'react';
import ReactDOM from 'react-dom';

/* project imports */
import './index.scss';
import FoodOrderingApplication from "./FoodOrderingApplication.js";


ReactDOM.render(
  <React.StrictMode>
    <FoodOrderingApplication/>
  </React.StrictMode>,
  document.getElementById('root')
);
