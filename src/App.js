import React from 'react';
import DetailedCityView from './DetailedCityView';
import './App.css';

function App(props) {
  
  var cities = props.cities.map((city) =>
      <li className="mdl-list__item" key={city.wid}><DetailedCityView city={city}/></li>
  );

  return (
    <div className="App">
      <div className="city-list"><ul className="mdl-list">{cities}</ul></div>
    </div>
  );
}

export default App;
