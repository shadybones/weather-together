import {mockTodayDetails, mockForcastDay, mockAlarms5} from './Accuweather.mock';

class Accuweather {
    //forgive me
    static ENDPOINT = window.location.protocol+"//"+window.APP_CONFIG.SERVER_HOST+":"+window.APP_CONFIG.SERVER_PORT+"/api/";

    constructor(entity, isMock=false) {
        this.doMock = isMock;
        this.entity = entity;
        if(!entity) throw Error("Invalid argument: null");
    }

    get5DayAlarms(callback){
        if(!this.entity.alarms5Day){
            if(this.doMock){
                this.entity.alarms5Day = mockAlarms5;
                callback(this.entity);
            }else{}
            
            fetch(Accuweather.ENDPOINT+'alarms/v1/5day/'+this.entity.wid)
                .then(response => response.json())
                .then(data => {
                    console.log("got data from api", data);
                    this.entity.alarms5Day = data[0].Alarms;
                    callback(this.entity);
                });
        }
    }
    
    getTodaysDetails(callback){
        if(!this.entity.today){
            if(this.doMock){
                this.entity.today = mockTodayDetails[0];
                callback(this.entity);
            }else{
                fetch(Accuweather.ENDPOINT+'currentconditions/v1/'+this.entity.wid+"?details=true")
                    .then(response => response.json())
                    .then(data => {
                        console.log("got data from api daytails", data);
                        this.entity.today = data[0];
                        callback(this.entity);
                    });
            }
        }
    }    
    
    get5DayForcast(callback){
        if(!this.entity.forcast5){
            if(this.doMock){
                this.entity.forcast5 = [mockForcastDay,mockForcastDay,mockForcastDay,mockForcastDay,mockForcastDay];
                callback(this.entity);
            }else{
                fetch(Accuweather.ENDPOINT+'forecasts/v1/daily/5day/'+this.entity.wid)
                    .then(response => response.json())
                    .then(data => {
                        console.log("got data from api forcast", data);
                        this.entity.forcast5 = data.DailyForecasts;
                        callback(this.entity);
                    });
            }
        }
    }
}
export default Accuweather;