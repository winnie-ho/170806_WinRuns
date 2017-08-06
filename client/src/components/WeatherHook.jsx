import React from "react";
import ReactDOM from "react-dom";
import dbHandler from "../dbHandler";

class WeatherHook extends React.Component{
  constructor(props){
    super(props)
    this.getWeather = this.getWeather.bind(this);

    this.state = {
    	weather: [],
    }
  }

  componentWillMount(){
    this.getWeather();
  }

  getWeather(){
    var url = "http://api.openweathermap.org/data/2.5/weather?q=Edinburgh,uk&appid=b7114aca731d927ad002d0a518f38dfe";
    var word = "GET";
    var callback = function(data){
      this.setState({weather: data});
    }.bind(this);
    var dataToSend = null;
    var DBQuery = new dbHandler();
    DBQuery.callExternal(url, word, callback, dataToSend); 
  }

  render(){

    return(
      <div className = "weather-div">
        Weather
      </div>
    )
  }
}

export default WeatherHook
