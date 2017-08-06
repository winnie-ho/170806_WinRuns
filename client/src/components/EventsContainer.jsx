import React from "react"
import { Link, browserHistory, hashHistory } from "react-router";
import EventListing from "./EventListing"


class EventsContainer extends React.Component{

constructor(props){
  super(props)
  this.doSearch = this.doSearch.bind(this)
  this.setEventView = this.setEventView.bind(this)

  this.state = {
    searchQuery: "",
    showEvent: null,
    eventId: "",
    eventToView: null
  }
}

componentDidMount(){
  this.setEventView
}

doSearch(event){
  this.setState({searchQuery: event.target.value})
}

setEventView(event){
  this.setState({eventId: event.target.value})
  console.log("event id", this.state.eventId)

  for (var item of this.props.events){
    console.log(item.id)
    if(item.id === this.state.eventId){
      this.setState({eventToView: item})
    }
  }
  console.log("event to view:", this.state.eventToView)
}


render() {
  return(
    <div className="events-inner-div" >
      <div className = "event-tools">
        <input 
        className='search-box' 
        type='text' 
        placeholder='🔎 search' 
        value = {this.state.searchQuery} 
        onChange={this.doSearch} />
        
        <Link className = "add-event-plus" to = {
          {
            "pathname": "/groups/:id/newEvent",
            "query": {
              "groupId": this.props.groupId
            }
          }
        }>

        <h1>+</h1></Link>
      </div>
        <EventListing 
        userId = {this.props.userId} 
        userName = {this.props.userName} 
        searchQuery = {this.state.searchQuery} 
        events = {this.props.events} 
        setEventView = {this.setEventView}
        groupId = {this.props.groupId}/>
    </div>
    )
  }
}


export default EventsContainer
  // this.props.router.push("/groups/:id/event/:id")