import React from "react";
import dbHandler from "../dbHandler";
import {Link, browserHistory, hashHistory} from "react-router";
import EventNew from "./EventNew";
import DeleteConfirm from "./DeleteConfirm"
import MapView from "./MapView";
import WeatherHook from "./WeatherHook";


class EventView extends React.Component{
  constructor(props){
    super(props)
    this.eventId = this.props.location.state.id;
    this.deleteEvent = this.deleteEvent.bind(this);
    this.addAttendee = this.addAttendee.bind(this);
    this.getAttendees = this.getAttendees.bind(this);
    this.parseEvent = this.parseEvent.bind(this);
    this.removeAttendee = this.removeAttendee.bind(this);
    this.editEvent = this.editEvent.bind(this);
    this.editEventInDB = this.editEventInDB.bind(this);
    this.handleOnChangeName = this.handleOnChangeName.bind(this);
    this.handleOnChangeDate = this.handleOnChangeDate.bind(this);
    this.handleOnChangeTime = this.handleOnChangeTime.bind(this);
    this.handleOnChangeLocation = this.handleOnChangeLocation.bind(this)
    this.handleOnChangeDescription = this.handleOnChangeDescription.bind(this);
    this.handleOnChangeRoute = this.handleOnChangeRoute.bind(this);
    this.getEvent = this.getEvent.bind(this);
    this.goBack = this.goBack.bind(this);
    this.setRunLine = this.setRunLine.bind(this);
    this.jumpRight = this.jumpRight.bind(this);
    this.jumpLeft = this.jumpLeft.bind(this);
    this.deleteEventSwitch = this.deleteEventSwitch.bind(this);
    this.resetDeleteEvent = this.resetDeleteEvent.bind(this);

    this.state = {
      attendees: [],
      event: null,
      going: null,
      attendeeId: null,
      editEvent: false,
      editName: null,
      editDate: null,
      editTime: null,
      editLocation: null,
      editDescription: null,
      editRoute: null,
      runLine: null,
      deleteEvent: false
    }
  }

  componentWillMount(){
    this.parseEvent();
  }

  componentDidMount(){
    this.getAttendees();
    this.getEvent();
  }

  parseEvent(){
    var eventString = this.props.location.state.event;
    var eventObject = JSON.parse(eventString);
    this.setState({event: eventObject});
  }

  goBack(){
    this.props.router.goBack();
  }

  getEvent(){
    var urlSpec = "/groups/" + this.state.event.group_id + "/events/" + this.state.event.id;
    var word = "GET";
    var callback = function(data){
      this.setState({event: data})
    }.bind(this);
    var dataToSend = null;
    var DBQuery = new dbHandler();
    DBQuery.callDB(urlSpec, word, callback, dataToSend);
  }

  getAttendees(){
    var urlSpec = "/groups/" + this.state.event.group_id + "/events/" + this.state.event.id + "/attendees";
    var word = "GET";
    var callback = function(data){
      for(var attendee of data){
        if(attendee.userName == this.props.location.state.userName){
          this.setState({attendees: data, going: true, attendeeId: data[data.length-1].id});
        } else if (attendee.userName !== this.props.location.state.userName){
          this.setState({going: false, attendees: data});
        }
      }
    }.bind(this);
    var dataToSend = null;
    var DBQuery = new dbHandler();
    DBQuery.callDB(urlSpec, word, callback, dataToSend);
  }

  deleteEventSwitch(){
    this.setState({deleteEvent: true});
  }

  resetDeleteEvent(){
    this.setState({deleteEvent: false});
  }

  deleteEvent(){
    event.preventDefault();
    var urlSpec = "groups/" + this.state.event.group_id + "/events/" + this.state.event.id;
    var word = "DELETE";
    var callback = function(data){
      console.log("event deleted", data);
      this.goBack();
    }.bind(this);
    var dataToSend = null;
    var DBQuery = new dbHandler();
    DBQuery.callDB(urlSpec, word, callback, dataToSend);
  }

  addAttendee(){
    var urlSpec = "groups/:id/events/:id/attendees";
    var word = "POST";
    var callback = function(data){
      console.log("attendee added",data);
      this.getAttendees();
    }.bind(this);
    const data = {
      attendee:{
        event_id: this.state.event.id,
        user_id: this.props.location.state.userId,
        userName: this.props.location.state.userName
      }
    }
    var dataToSend = JSON.stringify(data);
    var DBQuery = new dbHandler();
    DBQuery.callDB(urlSpec, word, callback, dataToSend);
  }

  removeAttendee(){
    event.preventDefault();
    var urlSpec = "groups/" + this.state.event.group_id + "/events/" + this.state.event.id + "/attendees/" + this.state.attendeeId;
    var word = "DELETE";
    var callback = function(data){
      console.log("attendee removed");
      this.setState({going: false, attendees: []});
      this.getAttendees();
    }.bind(this);
    var dataToSend = null;
    var DBQuery = new dbHandler();
    DBQuery.callDB(urlSpec, word, callback, dataToSend);
  }

  editEvent(){
    this.setState({
      editEvent: true,
      editName: this.state.event.name,
      editDate: this.state.event.date,
      editTime: this.state.event.time,
      editLocation: this.state.event.location,
      editDescription: this.state.event.description,
      editRoute: this.state.event.route
    });
  }

  editEventInDB(){
    var urlSpec = "groups/" + this.state.event.group_id + "/events/" + this.state.event.id;
    var word = "PUT";
    var callback = function(data){
      this.setState({editEvent: false}, this.getEvent());
    }.bind(this);
    const data = {
      event: {
        name: this.state.editName,
        date: this.state.editDate,
        time: this.state.editTime,
        location: this.state.editLocation,
        description: this.state.editDescription,
        route: this.state.editRoute,
        group_id: this.state.event.group_id
      }
    }
    var dataToSend = JSON.stringify(data);
    var DBQuery = new dbHandler();
    DBQuery.callDB(urlSpec, word, callback, dataToSend);
    console.log("event updated", data);
  }

  handleOnChangeName(event){
    this.setState({editName: event.target.value});
  }

  handleOnChangeDate(event){
    this.setState({editDate: event.target.value});
  }

  handleOnChangeTime(event){
    this.setState({editTime: event.target.value});
  }

  handleOnChangeLocation(event){
    this.setState({editLocation: event.target.value});
  }

  handleOnChangeDescription(event){
    this.setState({editDescription: event.target.value});
  }

  handleOnChangeRoute(event){
    this.setState({editRoute: event.target.value});
  }

  setRunLine(runLine){
    this.setState({runLine: runLine});
  }

  jumpRight(){
    var divScroll = document.querySelector(".event-div");
    divScroll.scrollLeft = divScroll.scrollWidth;
    console.log("jump right");
  }

  jumpLeft(){
    var divScroll = document.querySelector(".event-div");
    divScroll.scrollLeft = 0;
    console.log("jump left");
  }

  render() {
    //conditional for edit event form
    if(this.state.editEvent === true){
      var editEventForm = 
        <form>
          <input 
          type = "text" 
          onChange = {this.handleOnChangeName} 
          placeholder = "name" 
          defaultValue = {this.state.event.name} 
          className = "event-form-input"/> 
          <input 
          type = "text" 
          onChange = {this.handleOnChangeDate} 
          placeholder = "date" 
          defaultValue = {this.state.event.date.slice(0,10)} 
          className = "event-form-input"/>
          <input 
          type = "text" 
          onChange = {this.handleOnChangeTime} 
          placeholder = "time" 
          defaultValue = {this.state.event.time.slice(11,16)} 
          className = "event-form-input"/> 
          <input 
          type = "text" 
          onChange = {this.handleOnChangeLocation} 
          placeholder = "location" 
          defaultValue = {this.state.event.location} 
          className = "event-form-input"/> 
          <textarea 
          type = "text" 
          onChange = {this.handleOnChangeDescription} 
          placeholder = "description" 
          defaultValue = {this.state.event.description} 
          className = "event-form-input-description"/> 
          <button onClick = {this.editEventInDB}>UPDATE</button>
        </form>

    } else if (this.state.editEvent === false) {
      editEventForm = 
      <div className = "event-specs">
        <h2>{this.state.event.name}</h2>
        <h3>{this.state.event.date.slice(8,10)}/{this.state.event.date.slice(5,7)}/{this.state.event.date.slice(0,4)}</h3>
        <h3>{this.state.event.time.slice(11,16)}</h3>
        <h4>{this.state.event.location}  </h4> 
        <h4>{this.state.event.description}</h4>
      </div>;
    }

    //mapping attendees for render
    var attendeesNodes = this.state.attendees.map((attendee, index)=>{
      return(
          <div key = {index}>
            ⦿{attendee.userName}
          </div>
      )
    })

    //attendance control conditions
    if(this.state.going === false || this.state.going === null){
      var attendanceControl = 
        <div className = "attendance-control">
          <h1 onClick = {this.addAttendee}>+</h1>
        </div>
    } else if (this.state.going === true) {
      attendanceControl = 
        <div className = "attendance-control">
          <h1 onClick = {this.removeAttendee}>-</h1>
        </div>
    }

    //event delete confirm conditional 
    if(this.state.deleteEvent === true){
    var deleteBox = 
    <div>
      <DeleteConfirm deleteFunction = {this.deleteEvent} resetFunction = {this.resetDeleteEvent} dialogue = "Delete Event?"/>
    </div>
    } else if (this.state.deleteEvent === false) {
      deleteBox = 
      <div>
        <button onClick = {this.deleteEventSwitch} className = "icon-button">✄</button>
        <button onClick = {this.editEvent} className = "icon-button">✎</button>
      </div>
    }

    return(
        <div className = "event-view-div">
          <div className = "top-bar">
            <div onClick = {this.goBack} > ←back </div>
            <div className = "top-bar-right">
              {deleteBox}
            </div>
          </div>

          <div className = "event-div">


            <div className = "event-details">
              {editEventForm}
              
              <div className = "attendee-add-div">
                <h3> GOING </h3>
                  {attendanceControl}
              </div>

                  {attendeesNodes}

            </div>
            <div onClick = {this.jumpRight} className = "location-arrow">▷ </div>
            <div onClick = {this.jumpLeft} className = "location-arrow">◀︎ </div>


            <MapView setRunLine = {this.setRunLine} />
          </div>

          ⦿⦿
        </div>
    )
  }
}

export default EventView
