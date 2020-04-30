import React, { useState } from 'react';
import Accuweather from './Accuweather';
import './DetailedCityView.css';

function DetailedCityView(props){


    const [isDirty, doRedraw] = useState(0);

    const city = props.city;
    var forcastList = <br></br>;

    const weatherAPI = new Accuweather(city, false);
    if(!city.today) weatherAPI.getTodaysDetails(()=>doRedraw(isDirty+1));
    if(!city.forcast5) weatherAPI.get5DayForcast(()=>doRedraw(isDirty+1));
    //if(!city.alarms5Day) weatherAPI.get5DayAlarms(()=>doRedraw(isDirty+1));

    function deleteCity(){
        var eve = new CustomEvent("action:remove-city",{detail:city});
        window.dispatchEvent(eve);
    }

    //use city as "state" because I'm lazy to write a full component just for a menu
    function toggleMenu(){
        city.mopen = !city.mopen;
        doRedraw(isDirty+1);
    }
    if(city.mopen){
        window.$(document).on("click",function me(eve){
            try{window.$(document).off("click",me);}catch(e){}
            city.mopen = false;
            doRedraw(isDirty+1);
        });
    }
    if(city.forcast5){
        //5 day forcast available
        forcastList = city.forcast5.map((day)=>{
            var date = new Date(day.Date);
            var daylist = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
            var iconNumber = day.Day.Icon;
            if(iconNumber<10){
                iconNumber = "0"+ iconNumber;
            }
            //http://developer.accuweather.com/sites/default/files/02-s.png
            return (
                <div className="mdl-list__item" key={day.Date}>
                    <span className="mdl-list__item-primary-content">
                        <img alt={day.Day.IconPhrase} src={"//developer.accuweather.com/sites/default/files/"+iconNumber+"-s.png"}></img>
                        <span>{daylist[date.getDay()]+" "+(date.getMonth()+1) + "/" + date.getDate()}</span>
                        <span>
                            Hi: {day.Temperature.Maximum.Value} &deg;F
                            <br></br>
                            Low: {day.Temperature.Minimum.Value} &deg;F
                        </span>
                    </span>
                    
                    <i className="material-icons"></i>
                </div>
            );
        });
    }

    return (
        <div className="DetailedCityView mdl-card mdl-grid mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet">
          <div className="current-day-container mdl-cell mdl-cell--8-col">
            <div>{city.name}</div>
            <div>{city.today && city.today.Temperature.Imperial.Value}&deg; F</div>
            <div>{city.today && city.today.WeatherText}</div>
            <div>12hr Low {city.today && city.today.TemperatureSummary.Past12HourRange.Minimum.Imperial.Value}&deg; F</div>
            <div>12hr High {city.today && city.today.TemperatureSummary.Past12HourRange.Maximum.Imperial.Value}&deg; F</div>
            <div>24hr Rainfall {city.today && city.today.PrecipitationSummary.Past24Hours.Imperial.Value}in</div>
        
          </div>
          <div className="day-list mdl-cell mdl-cell--4-col mdl-list">
                {forcastList}
          </div>
          <button onClick={toggleMenu} className="actions-menu mdl-button mdl-js-button mdl-button--icon">
             <i className="material-icons">more_vert</i>
          </button>

            <ul className={"mdl-shadow--2dp actions-menu mdl-menu mdl-menu--bottom-left mdl-menu__container" + (city.mopen?" show":"")}>
                <li onClick={deleteCity} className="mdl-menu__item">Delete City</li>
            </ul>
          
        </div>
      );
}

export default DetailedCityView;