var MapStyle = function() {
  this.style = [
  {
    "elementType": "geometry",
    "stylers": [
    {
      "color": "#f5f5f5"
    }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
    {
      "visibility": "off"
    }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
    {
      "color": "#FC7F2D"
    }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
    {
      "color": "#f5f5f5"
    }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
    {
      "color": "#bdbdbd"
    }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
    {
      "color": "#eeeeee"
    }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
    {
      "color": "#FC7F2D"
    }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
    {
      "color": "#e5e5e5"
    }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
    {
      "color": "#FC7F2D"
    }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
    {
      "color": "#ffffff"
    }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
    {
      "color": "#FC7F2D"
    }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
    {
      "color": "#dadada"
    }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
    {
      "color": "#FC7F2D"
    }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
    {
      "color": "#FC7F2D"
    }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
    {
      "color": "#e5e5e5"
    }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
    {
      "color": "#eeeeee"
    }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
    {
      "color": "#c9c9c9"
    }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
    {
      "color": "#9e9e9e"
    }
    ]
  }
  ]
}

MapStyle.prototype = {
  getStyle: function(){
    return this.style;
  }
}

export default MapStyle