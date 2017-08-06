import { Link, browserHistory, hashHistory } from "react-router";

var dbHandler = function(){

}

dbHandler.prototype = {
	callDB: function(urlSpec, word, callback, dataToSend){
	var url = "https://whooprails.herokuapp.com/" + urlSpec;
  var request = new XMLHttpRequest();
  request.open(word, url);
  request.setRequestHeader("content-type", "application/json");
  request.withCredentials = true;
    request.onload = function(){
     	if(request.status === 200){
        var data = JSON.parse(request.responseText);
        console.log("data", data);
        callback(data);
      } else {
        console.log("Uh oh you're not logged in!");
        browserHistory.goBack();
      }
    }
  request.send(dataToSend);
	},

  

  callExternal: function(url, word, callback, dataToSend){
  var request = new XMLHttpRequest();
  request.open(word, url);
  request.setRequestHeader("content-type", "application/json");
  request.withCredentials = true;
    request.onload = function(){
      if(request.status === 200){
        var data = JSON.parse(request.responseText);
        console.log("data", data);
        callback(data);
      } else {
        console.log("Error in obtaining API!");
        browserHistory.goBack();
      }
    }
  request.send(dataToSend);
  }
}

module.exports = dbHandler;