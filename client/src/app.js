import React from "react"
import ReactDOM from "react-dom"
import Home from "./components/Home"
import Main from "./components/Main"
import SignUp from "./auth/SignUp"
import GroupsContainer from "./components/GroupsContainer"
import GroupView from "./components/GroupView"
import GroupNew from "./components/GroupNew"
import EventListing from "./components/EventListing"
import EventView from "./components/EventView"
import EventNew from "./components/EventNew"
import {Router, Route, IndexRoute, hashHistory} from "react-router"

class App extends React.Component{

  render() {
    return(
    <Router history = {hashHistory}>
      <Route path = "/" component = {Main}>
        <IndexRoute component = {Home}/>
        <Route path = "/groups" component = {GroupsContainer}/>
        <Route path = "/groups/:id" component = {GroupView}/>
        <Route path = "/groups/:id/newEvent" component = {EventNew}/>
        <Route path = "/groups/:id/showEvent" component = {EventView}/>
        <Route path = "/events" component = {EventListing}/>
        <Route path = "/events/:id" component = {EventView}/>
      </Route>
    </Router>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById("app"))

