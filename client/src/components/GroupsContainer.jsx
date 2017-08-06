import React from "react";
import { Link, browserHistory } from "react-router";
import GroupsListing from "./GroupsListing";
import dbHandler from "../dbHandler";

class GroupsContainer extends React.Component {

  constructor(props) {
    super(props)
    this.getUser = this.getUser.bind(this);
    this.getGroups = this.getGroups.bind(this);
    this.addGroup = this.addGroup.bind(this);
    this.getLastGroup = this.getLastGroup.bind(this);
    this.addMembership = this.addMembership.bind(this);
    this.handleNewGroup = this.handleNewGroup.bind(this);
    this.setAddedGroup = this.setAddedGroup.bind(this);
    this.setLastSeen = this.setLastSeen.bind(this);
    this.getUpdates = this.getUpdates.bind(this);


    this.state = {
      groups: [],
      addedGroup: null,
      newGroup: false,
      userId: null,
      userTime: null,
      userName: null,
      recentGroup: null,
      groupUpdates: [],
      eventUpdates: [],
      msgUpdates: null
    }

  }

  componentDidMount(){
    this.getGroups();
    this.getUser();
  }

  getUser(){
    var urlSpec = "users/1";
    var word = "GET";
    var callback = function(data){
      this.setState({
        userId: data.id,
        userName: data.name,
        userTime: data.updated_at
      })
        console.log("setting userId:", this.state.userId);
        console.log("setting userName:", this.state.userName);
        console.log("setting userTime:", this.state.userTime);
    }.bind(this);
    var dataToSend = null;
    var DBQuery = new dbHandler();
    DBQuery.callDB(urlSpec, word, callback, dataToSend);
  }

  getGroups(){
    var urlSpec = "memberships/1";
    var word = "GET";
    var callback = function(data){
      this.setState({groups: data})
        console.log("setting groups:", this.state.groups);
        this.setLastSeen();
        this.getUpdates();
    }.bind(this);
    var DBQuery = new dbHandler();
    var dataToSend = null;
    var DBQuery = new dbHandler();
    DBQuery.callDB(urlSpec, word, callback, dataToSend);
  }

  setLastSeen(){
    var time = new Date();
    var timeNow = time.toISOString();
    var getLastSeen = null;
    if(localStorage.getItem("lastSeen-" + this.state.userId) === null){
      getLastSeen = this.state.userTime;
    }else{
      getLastSeen = localStorage.getItem("lastSeen-" + this.state.userId)
    }
    this.setState({lastSeen: getLastSeen});
    console.log("LAST SEEN", getLastSeen);
    localStorage.setItem("lastSeen-" + this.state.userId, timeNow);
  }

  getUpdates(){
    var groups = this.state.groups;
    var gUpdates = [];
    var eUpdates = [];
    for(var group of groups){
      if (this.state.lastSeen < group.group.updated_at){
      gUpdates.push(group.group_id);
      }
    }

    for(var group of groups){
      for (var event of group.group.events){
        if (this.state.lastSeen < event.updated_at){
        eUpdates.push(group.group_id);
        }
      }
    }

    this.setState({groupUpdates: gUpdates});
    this.setState({eventUpdates: eUpdates});

    // for(var group of groups){
    //   for (var msg of group.group.messages){
    //   console.log("message:", msg.updated_at);
    //     if (this.state.lastSeen < event.updated_at){
    //       msgUpdates ++;
    //     }
    //   }
    // }

    console.log("groups", this.state.groups);
    console.log("group updates", this.state.groupUpdates);
    console.log("event updates", this.state.eventUpdates);
    // console.log("msg updates", msgUpdates);
    // this.setState({msgUpdates: msgUpdates});
  }

  addGroup(event){
    event.preventDefault();
    var urlSpec = "groups";
    var word = "POST";
    var callback = function(data){
      this.setState({ newGroup:false}, this.getLastGroup());
    }.bind(this);
    const data = {
      group: {
        name: this.state.addedGroup
      }
    }
    var dataToSend = JSON.stringify(data);
    var DBQuery = new dbHandler();
    DBQuery.callDB(urlSpec, word, callback, dataToSend);
    console.log("group added", data);
  }

  getLastGroup(){
    var urlSpec = "groups";
    var word = "GET";
    var callback = function(data){
      var lastGroupId = data[data.length-1].id
      this.setState({recentGroup: lastGroupId})
      this.addMembership()
      console.log("recentGroup:", this.state.recentGroup)
    }.bind(this);
    var dataToSend = null;
    var DBQuery = new dbHandler();
    DBQuery.callDB(urlSpec, word, callback, dataToSend);
  }

  addMembership(event){
    var urlSpec = "memberships";
    var word = "POST";
    var callback = function(data){
      this.setState({ newGroup:false },this.getGroups())
    }.bind(this);
    const data = {
      membership: {
        user_id: this.state.userId,
        userName: this.state.userName,
        group_id: this.state.recentGroup
      }
    }
    var dataToSend = JSON.stringify(data);
    var DBQuery = new dbHandler();
    DBQuery.callDB(urlSpec, word, callback, dataToSend);
    console.log("membership added", data);
  }

  handleNewGroup(){
    this.setState({newGroup:true});
  }

  setAddedGroup(addedGroup){
    this.setState({addedGroup: addedGroup});
  }

  render(){
    return(
      <div className="listing">
        <GroupsListing 
        userId = {this.state.userId} 
        userName = {this.state.userName} 
        userTime = {this.state.userTime}
        newGroup = {this.state.newGroup} 
        setGroup = {this.setAddedGroup} 
        addGroup = {this.addGroup} 
        groups = {this.state.groups} 
        handleNewGroup = {this.handleNewGroup}
        groupUpdates = {this.state.groupUpdates}
        eventUpdates = {this.state.eventUpdates}
        router = {this.props.router}/>
      </div>
    )
  }
}

export default GroupsContainer