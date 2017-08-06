import React from "react";
import { Link, browserHistory, hashHistory } from "react-router";
import SignOut from "../auth/SignOut";
import SignIn from "../auth/SignIn";
import SignUp from "../auth/SignUp";
import dbHandler from "../dbHandler";


class Home extends React.Component {

  constructor() {
    super()
    this.setUser = this.setUser.bind(this);
    this.goBack = this.goBack.bind(this);
    this.createAccount = this.createAccount.bind(this);
    this.getData = this.getData.bind(this);

    this.state = {
      currentUser: null,
      createAccount: false,
      data: [],
    }
  }

  componentDidMount(){
    this.getUser();
  }

  getUser(){
    const request = new XMLHttpRequest();
    request.open("GET", "https://whooprails.herokuapp.com/users/1.json");
    request.setRequestHeader("content-type", "application/json");
    request.withCredentials = true;
    request.onload = () => {
      if(request.status === 200){
        console.log("request.responseText", request.responseText);
        const receivedUser = JSON.parse(request.responseText);
        this.setUser(receivedUser, this.getData());
      } else if (request.status === 401){
        this.setUser(null);
      }
    }
    request.send(null);
  }

  getData(){
    var urlSpec = "memberships/1";
    var word = "GET";
    var callback = function(data){
      this.setState({data: data})
      console.log("Warming up", data);
    }.bind(this);
    var DBQuery = new dbHandler();
    var dataToSend = null;
    var DBQuery = new dbHandler();
    DBQuery.callDB(urlSpec, word, callback, dataToSend);
  }

  setUser(user){
    this.setState({currentUser:user});
  }

  goBack(){
    this.setState({currentUser:null});
    this.setState({createAccount:false});
    console.log("current user", this.state.currentUser);
  }

  createAccount() {
    this.setState({currentUser:null});
    this.setState({createAccount:true});
    console.log("create account clicked", this.state.createAccount);
  }

  render() {
  {/*initial state render - sign in*/}
  var mainDiv = <div className = "sign-in" >
    <h4>LOGIN</h4>
    <SignIn url="https://whooprails.herokuapp.com/users/sign_in.json" onSignIn={this.setUser}></SignIn>
    <div className = "link-hover" onClick = {this.createAccount}>
      <p>create account</p>
    </div>
  </div>
  var signOutDiv = <div> </div>

  {/*2nd state render - sign up*/}
  if(this.state.createAccount === true){
    var createAccDiv = <div className = "create-account"> 
      <h4>SIGN UP</h4>
      <SignUp url="https://whooprails.herokuapp.com/users.json" create = {this.state.createAccount} onSignUp={this.setUser}></SignUp>
      <div className = "link-hover" onClick = {this.goBack}>
        <p> ← sign in </p>
      </div>

    </div>
    mainDiv = <div> </div>
    signOutDiv = <div> </div>
  }

  {/*3rd state render - enter*/}
  if(this.state.currentUser){
    mainDiv = <div className = "sign-in">
      <div className = "intro">
        <h3> Hi </h3>
        <h2> {this.state.currentUser.name}</h2>
        <Link to = {
          {
            "pathname": "/groups",
            "state": {
              "data": this.state.data
            }
          } 
        }>
          <h3>MY GR<span className = "enter">◉</span>UPS</h3>
        </Link>
      </div>
    </div>

    signOutDiv = <div>
      <SignOut url="https://whooprails.herokuapp.com/users/sign_out.json" onSignOut={this.setUser}></SignOut>
    </div>
    createAccDiv = <div></div>
  }
  
{/*calling the render*/}
    return (
      <div className="home">
        <div className ="top">
          <h1>WH<span className='title'>◉◎</span>P</h1>
        
        </div>
          <div className = "sign-in">
            { mainDiv }
          </div>
          <div className = "create-account">
            { createAccDiv }
          </div>
          {signOutDiv}
      </div>
    ) 

  }
}
export default Home;