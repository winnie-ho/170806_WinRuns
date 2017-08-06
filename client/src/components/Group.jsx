import React from "react";
import {Link} from "react-router";

class Group extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
      if(this.props.eventUpdates == -1){
        var eventAlert = <div></div>
      }else if (this.props.eventUpdates >= 0 ){
        eventAlert = 
        <div className = "alerts">
          <h3>🗓</h3>
        </div>
      }
    console.log("result", this.props.eventUpdates);

    // var alertNodes = 
    //   <div className = "alerts"> 
    //     <h3>💬</h3>

    //   </div>

    return(
      <div className="group">
        <Link to = {
          {
            "pathname": "/groups/"+ this.props.groupId,
            "state": {
              "groupId": this.props.groupId,
              "userName": this.props.userName,
              "userId": this.props.userId,
              "userTime": this.props.userTime,
              "eventUpdates": this.props.eventUpdates,
            }
          }
        }>{this.props.group.name}
        </Link>
        {eventAlert}
      </div>

    )
  }
}
export default Group
