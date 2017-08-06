import React from "react";
import ReactDOM from "react-dom";
import MapStyle from "../mapStyle";
import StravaHook from "./StravaHook";


class MapView extends React.Component{
  constructor(props){
    super(props)
    this.createMap = this.createMap.bind(this);
    this.geoLocate = this.geoLocate.bind(this);
    this.addMarker = this.addMarker.bind(this);
    this.setRun = this.setRun.bind(this);
    this.plotRoute = this.plotRoute.bind(this);


    this.state = {
    	map: null,
      runLine: "",
      run: null,
      runSelected: [],
    }
  }

  componentDidMount(){
    this.createMap();
  }

  createMap(){
    var mapStyle = new MapStyle();
    var style = mapStyle.getStyle();
    var mapOptions = {
    zoom: 13,
    center: {lat: 55.9533, lng:-3.1883 },
    styles: style
    }
    var map = new google.maps.Map(ReactDOM.findDOMNode(this.refs.map_canvas), mapOptions);
    this.setState({map: map});
  }

  geoLocate(map){
    navigator.geolocation.getCurrentPosition(function(position){
      var centre = {lat: position.coords.latitude, lng: position.coords.longitude};
      map.setCenter(centre);
      var marker = this.addMarker(centre);
      var infoWindow = new google.maps.InfoWindow({
        content: "<h3>YOU ARE HERE</h3>"
      });
      infoWindow.open(map, marker);
    }.bind(this))
  }

  addMarker(coords){
    var marker = new google.maps.Marker({
      position: coords,
      map: this.state.map,
      animation: google.maps.Animation.DROP
    });
    return marker;
  }

  addInfoWindow(map, marker, contentString){
    var infoWindow = new google.maps.InfoWindow({
      content: contentString,
    });
    marker.addListener("click", function(){
    infoWindow.open(this.state.map, marker);
    })
  }

  setRun(run){
    this.setState({runSelected:run, runLine: null});
  }

  addPolyline(runLine, startPoint){
    var line = new google.maps.Polyline({
      path: google.maps.geometry.encoding.decodePath(runLine),
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2,
      map: this.googleMap
    });

    line.setMap(null);
    line.setMap(this.state.map);
    this.state.map.setCenter(startPoint);
  }


  plotRoute(){
    console.log("runSelected", this.state.runSelected);
    var runLine = this.state.runSelected.map.summary_polyline;
    this.setState({runLine: runLine}, this.props.setRunLine());


    var middlePoint = {lat: ((this.state.runSelected.start_latlng[0] + this.state.runSelected.end_latlng[0])/2), lng: ((this.state.runSelected.start_latlng[1] + this.state.runSelected.end_latlng[1])/2)};
    var startPoint = {lat: this.state.runSelected.start_latlng[0], lng: this.state.runSelected.start_latlng[1]};
    this.addPolyline(runLine, middlePoint);
    var marker = this.addMarker(startPoint);
    var infoWindow = new google.maps.InfoWindow({
        content: "<h3>START</h3>" + this.state.runSelected.name 
      });
      infoWindow.open(this.state.map, marker);
  }

  render(){
    console.log("run", this.state.run);
    return(
      <div className = "map-side">
        <StravaHook setRun = {this.setRun} plotRoute = {this.plotRoute}/>
        <div ref = "map_canvas" className = "main-map">

        </div>
      </div>
    )
  }
}

export default MapView
