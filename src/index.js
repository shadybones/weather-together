import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

function draw(event){
  ReactDOM.render(
    <React.StrictMode>
      <App cities={event.detail}/>
    </React.StrictMode>,
    document.getElementById('root')
  );
}
//window.addEventListener("updated:settings", draw);
window.addEventListener("updated:cities", draw);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
