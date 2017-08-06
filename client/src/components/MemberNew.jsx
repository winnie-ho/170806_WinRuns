import React from "react";
import dbHandler from "../dbHandler";

class MemberNew extends React.Component {

	constructor(props){
		super(props)
		this.getUsers = this.getUsers.bind(this);
		this.handleNewMember = this.handleNewMember.bind(this);
		this.handleSelectorChange = this.handleSelectorChange.bind(this);
		this.addMember = this.addMember.bind(this);
		this.state = {
			newMember: false,
			users: [],
			selectedMember: null,
		}
	}

	componentDidMount(){
  	this.getUsers();
	}

	getUsers(){
		var urlSpec = "/users";
    var word = "GET";
    var callback = function(data){
			this.setState({users: data});
    }.bind(this);
    var dataToSend = null;
    var DBQuery = new dbHandler();
    DBQuery.callDB(urlSpec, word, callback, dataToSend); 
	}

	handleNewMember(){
		this.setState({newMember: true});
	}

	handleSelectorChange(event){
		var userToAdd = event.target.value;
		this.setState({selectedMember: this.state.users[userToAdd]});
	}

	addMember(event){
	event.preventDefault();
    var urlSpec = "memberships";
    var word = "POST";
    var callback = function(data){
      this.setState({newMember: false});
  		this.props.getMemberships();
    }.bind(this);
    const data = {
      membership: {
     		user_id: this.state.selectedMember.id,
    		userName: this.state.selectedMember.name,
    		group_id: this.props.groupId
    	}
    }
    var dataToSend = JSON.stringify(data);
    var DBQuery = new dbHandler();
    DBQuery.callDB(urlSpec, word, callback, dataToSend);
    console.log("member added", data);
	}

	render(){
		// filling in the options for selector

		var memberOptions = this.state.users.map(function(user, index){
			return <option	placeholder = "select" value = {index} key = {index}>
							{user.name}
						 </option>
		})
		// conditional for on addMember
		if(this.state.newMember === true){
			var memberDD = 
			<div className = "add-member-form">
				<select defaultValue = "select" onChange = {this.handleSelectorChange}>
					<option disabled = "true">select</option>
					{memberOptions}
				</select>
				<button onClick = {this.addMember}>
					ADD
				</button>
			</div>
		} else if (this.state.newMember === false){
			memberDD = 
			<div className = "go-back">
			<h1 onClick = {this.handleNewMember}> + </h1>
			</div>
		}


		// defining the render
		return(
			<div>
			    {memberDD}  
			</div>
		)
	}
}

export default MemberNew