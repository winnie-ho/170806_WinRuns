import React from "react";

class MessagesContainer extends React.Component{

constructor(props){
  super(props)


}

componentDidMount(){
  this.props.scrollMsg();
}

render() {

  //sorting the messages by date
  this.props.messages.sort(function(a,b){
    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime() 
  });

  var messageNodes = this.props.messages.map((message, index)=>{
    return(
      <div className = "message-div" key = {index}>
        <h6>{message.created_at.slice(8,10)}/{message.created_at.slice(5,7)}/{message.created_at.slice(0,4)}, {message.created_at.slice(11,16)} </h6>
        <p key = {index}>  <b>{message.userName} ▻ </b> {message.msg} </p>
      </div>
    )
  })

  return(
    <div className = "message-list">
      {messageNodes}
      <div className = "fake-message-div"></div>
    </div>
    )
  }
}

export default MessagesContainer