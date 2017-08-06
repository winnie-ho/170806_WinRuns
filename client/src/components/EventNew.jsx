import React from "react";
import ReactDOM from "react-dom";
import dbHandler from "../dbHandler";
import {Link, browserHistory, hashHistory} from "react-router";

class EventNew extends React.Component{
  constructor(props){
    super(props)
    this.handleOnChangeName = this.handleOnChangeName.bind(this);
    this.handleOnChangeDate = this.handleOnChangeDate.bind(this);
    this.handleOnChangeTime = this.handleOnChangeTime.bind(this);
    this.handleOnChangeLocation = this.handleOnChangeLocation.bind(this)
    this.handleOnChangeDescription = this.handleOnChangeDescription.bind(this);
    this.handleOnChangeRoute = this.handleOnChangeRoute.bind(this);
    this.addEvent = this.addEvent.bind(this);
    this.goBack = this.goBack.bind(this);

    this.state = {
      name: null,
      date: null,
      time: null,
      location: null,
      description: null,
      route: null,
      groupSelected: props.location.query.groupId
    }
  }

  handleOnChangeName(event){
    this.setState({name: event.target.value});
  }

  handleOnChangeDate(event){
    this.setState({date: event.target.value});
  }

  handleOnChangeTime(event){
    this.setState({time: event.target.value});
  }

  handleOnChangeLocation(event){
    this.setState({location: event.target.value});
  }

  handleOnChangeDescription(event){
    this.setState({description: event.target.value});
  }

  handleOnChangeRoute(event){
    this.setState({Route: event.target.value});
  }

  addEvent(event){
    event.preventDefault();
    var urlSpec = "groups/:id/events";
    var word = "POST";
    var callback = function(data){
    }.bind(this);
    const data = {
      event: {
        name: this.state.name,
        date: this.state.date,
        time: this.state.time,
        location: this.state.location,
        description: this.state.description,
        route: this.state.route,
        group_id: this.state.groupSelected
      }
    }
    var dataToSend = JSON.stringify(data);
    var DBQuery = new dbHandler();
    DBQuery.callDB(urlSpec, word, callback, dataToSend);
    console.log("event added", data);
    this.goBack();
  }

  goBack(){
    this.props.router.goBack();
  }

  render(){
    console.log("this props", this.props);
    return(
      <div className = "new-event-form">
      <div>
        <p onClick = {this.goBack}> ← back </p>
      </div>
      <h4>ADD EVENT</h4>
        <form>
          <input type = "text" onChange = {this.handleOnChangeName} placeholder = "name" className = "event-form-input"/> 
          <input type = "text" onChange = {this.handleOnChangeDate} placeholder = "date" className = "event-form-input"/>
          <input type = "text" onChange = {this.handleOnChangeTime} placeholder = "time" className = "event-form-input"/> 
          <input type = "text" onChange = {this.handleOnChangeLocation} placeholder = "location" className = "event-form-input"/> 
          <textarea type = "text" onChange = {this.handleOnChangeDescription} placeholder = "description" className = "event-form-input-description"/> 
          <button onClick = {this.addEvent}>ADD</button>
        </form>
      </div>
    )
  }
}

export default EventNew
        