import React from "react"
import Group from "./Group"
import GroupNew from "./GroupNew"
import {Link, browserHistory, hashHistory} from "react-router";

class GroupsListing extends React.Component{

  constructor(props) {
    super(props)
    console.log(this.props.eventUpdates);
    this.doSearch = this.doSearch.bind(this);
    this.handleNewGroup = this.handleNewGroup.bind(this);
    this.resetNewGroup = this.resetNewGroup.bind(this);
    this.state = {
      searchQuery: ""
    }
  }

  doSearch(event){
    this.setState({searchQuery: event.target.value});
  }

  handleNewGroup(){
    this.setState({newGroup:true});
  }

  resetNewGroup(){
    this.setState({newGroup:this.props.newGroup});
  }

  render() {
    //conditional for new group for to show
    if(this.props.newGroup === true){
      var newGroupForm = 
      <GroupNew 
        reset = {this.resetNewGroup} 
        setGroup = {this.props.setGroup} 
        addGroup = {this.props.addGroup}/>
    } else if (this.props.newGroup === false) {
      newGroupForm = "+";
    }

    console.log("eventUpdates in GL", this.props.eventUpdates);

    return(

      <div className = "groups-listing-div">
        <nav>
          <div className = "logo">
            <div>
              <Link to = "/">←home </Link>
            </div>
            <h1>WH<span className='title'>◉◎</span>P</h1>
          </div>
          <input 
            type = "text" 
            placeholder = "🔎 search" 
            value = {this.state.searchQuery} 
            onChange = {this.doSearch} />
        </nav>

        <div className="groups-scroll"> 

        {/*does the search filtering for the search bar*/}




        {
          this.props.groups.filter((group) => `${group.group.name}`.toUpperCase().indexOf(this.state.searchQuery.toUpperCase()) >= 0)
          .map((group) => (
            <Group { ...group } 
              key = {group.id} 
              userId = {this.props.userId}
              userName = {this.props.userName} 
              group = {group.group} 
              groupId = {group.group_id} 
              groups = {this.props.groups}
              userTime = {this.props.userTime}
              // groupUpdates = {this.props.groupUpdates}
              eventUpdates = {this.props.eventUpdates.indexOf(group.group_id)}
              router = {this.props.router}/>
            ))
        }
          <div className = "new-group" onClick = {this.props.handleNewGroup}>
            {newGroupForm}
          </div>
          <div className = "new-group-fake">
          </div>
          <div className = "new-group-fake">
          </div>
        </div>
      </div>
    )
  }
}

export default GroupsListing