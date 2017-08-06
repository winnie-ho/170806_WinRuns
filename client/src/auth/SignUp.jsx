import React from 'react'

class SignUp extends React.Component {

  constructor(props) {
    super(props)
    this.signUp = this.signUp.bind(this)
    this.handleOnChangeName = this.handleOnChangeName.bind(this)
    this.handleOnChangeEmail = this.handleOnChangeEmail.bind(this)
    this.handleOnChangePassword = this.handleOnChangePassword.bind(this)
    this.handleOnChangePassConf = this.handleOnChangePassConf.bind(this)
    this.state = {
      name:"",
      email:"", 
      password:"", 
      passwordConfirmation:""
    }
  }

  signUp(event){
    event.preventDefault();
    const request = new XMLHttpRequest();
    request.open("POST", this.props.url);
    request.setRequestHeader("content-type", "application/json");
    request.withCredentials = true;

    request.onload = () => {
      if (request.status === 201) {
        const user = JSON.parse(request.responseText);
        this.props.onSignUp(user);
      }
    }
    const data = {
      user: {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        password_confirmation: this.state.passwordConfirmation
      }
    }
    request.send(JSON.stringify(data));
  }

  handleOnChangeName(event) {
    this.setState({name: event.target.value})
  }

  handleOnChangeEmail(event) {
    this.setState({email: event.target.value})
  }

  handleOnChangePassword(event) {
    this.setState({password: event.target.value})
  }

  handleOnChangePassConf(event) {
    this.setState({passwordConfirmation: event.target.value})
  }
  
  render() {
    return (
      <form onSubmit={this.signUp} className='login-form'>
        <input type="text" onChange={this.handleOnChangeName}  placeholder="name" />
        <input type="text" onChange={this.handleOnChangeEmail}  placeholder="email" />
        <input type="password" onChange={this.handleOnChangePassword}  placeholder="password" />
        <input type="password" onChange={this.handleOnChangePassConf}  placeholder="password confirmation" />

        <button onClick={this.signUp}>SIGN UP</button>
      </form>
    )
  }
}

export default SignUp