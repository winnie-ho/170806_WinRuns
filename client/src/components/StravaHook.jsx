import React from "react";
import ReactDOM from "react-dom";
import dbHandler from "../dbHandler";

class StravaHook extends React.Component{
  constructor(props){
    super(props)
    this.getStravaRoutes = this.getStravaRoutes.bind(this);
    this.handleSelectorChange = this.handleSelectorChange.bind(this);

    this.state = {
    	runs: [],
      runIdSelected: null,
      runSelected: null,
      runLine: null,
    }
  }

  componentWillMount(){
    this.getStravaRoutes();
  }

  getStravaRoutes(){
    var url = "https://www.strava.com/api/v3/athlete/activities?per_page=200&access_token=a2ff6fffcab9df06d90661ad34b7e664690c4fc4";
    var word = "GET";
    var callback = function(data){
      this.setState({runs: data});
    }.bind(this);
    var dataToSend = null;
    var DBQuery = new dbHandler();
    DBQuery.callExternal(url, word, callback, dataToSend); 
  }

  handleSelectorChange(event){
    var runIdSelected = event.target.value;
    this.setState({runIdSelected: runIdSelected});

    var runSelected = this.state.runs[runIdSelected];
    this.setState({runSelected: runSelected}, this.props.setRun(runSelected));
  }



  render(){
    // filling in the options for selector
    var runOptions = this.state.runs.map(function(run, index){
      return <option  placeholder = "select" value = {index} key = {index}>
              {run.name}
             </option>
    })

    return(
      <div>
        ADD RUN ROUTE
      <div className = "strava-div">
        <select defaultValue = "select" onChange = {this.handleSelectorChange}>
        <option disabled = "true">select</option>
        {runOptions}
        </select>
        <button onClick = {this.props.plotRoute}>ADD</button>
      </div>
      </div>
    )
  }
}

export default StravaHook
