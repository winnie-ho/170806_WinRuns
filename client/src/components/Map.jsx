import React from "react";
import dbHandler from "../dbHandler";
import MapWrapper from "../mapWrapper"

class Map extends React.Component{
  constructor(props){
    super(props)
    this.goBack = this.goBack.bind(this);

    this.state = {
      
    }
  }


  componentDidMount(){

  }

  

  goBack(){
    this.props.router.goBack();
  }

  

  render() {

    var mainMap = new MapWrapper(centre, 14);


    return(
        <div className = "main-map-div">
          


        </div>
    )
  }
}

export default Map
