import React from "react";
import MemberNew from "./MemberNew";
import dbHandler from "../dbHandler";
import DeleteConfirm from "./DeleteConfirm";
import {Link, Router, browserHistory, hashHistory} from "react-router";

class Members extends React.Component {
	constructor(props){
		super(props)
		this.getMemberships = this.getMemberships.bind(this);
		this.removeMember = this.removeMember.bind(this);
		this.setUserMembership = this.setUserMembership.bind(this);
		this.uniqueMembers = this.uniqueMembers.bind(this);
		this.goBack = this.goBack.bind(this);
		this.leaveGroup = this.leaveGroup.bind(this);
		this.resetLeaveGroup = this.resetLeaveGroup.bind(this);

		this.state = {
			memberships: [],
			members: [],
			isMember: false,
			userMembership: null,
			leaveGroup: false,
		}
	}

	componentDidMount(){
  	this.getMemberships();
	}

	getMemberships(){
		var urlSpec = "memberships";
    var word = "GET";
    var callback = function(data){
			this.setState({memberships: data});
			this.setUserMembership();
      this.uniqueMembers();
    }.bind(this);
    var dataToSend = null;
    var DBQuery = new dbHandler();
    DBQuery.callDB(urlSpec, word, callback, dataToSend);
	}

	setUserMembership(){
		for(var membership of this.state.memberships){
			if(membership.user_id == this.props.userId && membership.group_id == this.props.groupId){
				this.setState({userMembership: membership.id});
			}
		}
	}

	uniqueMembers(){
		var allMemberships = [];
		for(var membership of this.state.memberships){
			if(membership.group_id == this.props.groupId){
				allMemberships.push(membership.userName);
			}
		}

		var uniqueMembers = [...new Set(allMemberships)];
		this.setState({members: uniqueMembers})
		console.log("Group Members:", uniqueMembers);
	}

	removeMember(){
		event.preventDefault();
    var urlSpec = "memberships/" + this.state.userMembership;
    var word = "DELETE";
    var callback = function(data){
    	this.goBack();
    }.bind(this);
    var DBQuery = new dbHandler();
    var dataToSend = null;
    var DBQuery = new dbHandler();
    DBQuery.callDB(urlSpec, word, callback, dataToSend);
	}

	goBack(){
		this.props.router.goBack();
	}

	leaveGroup(){
		this.setState({leaveGroup:true});
	}

	resetLeaveGroup(){
		this.setState({leaveGroup:false});
		console.log("leaving");
	}

	render(){
		//mapping members for render
		var membersNodes = this.state.members.map((member, index)=>{
	    return(
		    	<div className = "memberNodes" key = {index}>
		        <p>◉ {member}  ◎</p>
		      </div>
	    )
	  })


	  //leave group confirmation conditional 
    if(this.state.leaveGroup === true){
    var leaveBox = 
    <div>
      <DeleteConfirm deleteFunction = {this.removeMember} resetFunction = {this.resetLeaveGroup} dialogue = "Leave Group?"/>
    </div>
    } else if (this.state.leaveGroup === false) {
      leaveBox = 
      <div className = "member-tools" >
	      <h1 className = "go-back"onClick = {this.leaveGroup}>-</h1> 				
	      <MemberNew groupId = {this.props.groupId} getMemberships = {this.getMemberships}/>
      </div>
    }

		return(
			<div className = "members-inner">
				<div className = "members-add-div">
					<h3>GROUPIES</h3>
					<div>
	   		 		{leaveBox}
	   		 	</div>

				</div>
				<div className = "members-list-div">
					{membersNodes}
				</div>
			</div>
		)
	}
}

export default Members