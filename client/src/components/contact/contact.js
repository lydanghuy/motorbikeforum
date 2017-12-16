

import React, { Component } from 'react';
import './style.css';
// import {AsyncTypeahead} from 'react-bootstrap-typeahead';
import _ from 'lodash';

let map;
let bounds = new window.google.maps.LatLngBounds();
let sub_area;
let coordinates=[];
let color = ['#FF0000', '#4286f4','#ffff00','#ff00b2','#bb00ff','#00ffff','#26ff00','#00ff87'];

class Contact extends Component {

  constructor(props){
    super(props);
    this.state = {
      options: [],
      selectedOptions: []
    }
    this._handleSearch = this._handleSearch.bind(this);
    this.renderCoordinate = this.renderCoordinate.bind(this);

  }

  componentDidMount(){
    this._initMap()
  }

  _initMap () {
      
    map = new window.google.maps.Map(document.getElementById('map'),{
      center: {lat: 11.0547843, lng: 106.66559959999995},
      zoom: 17,
      zoomControl: true,
      zoomControlOptions: {
        position: window.google.maps.ControlPosition.RIGHT_CENTER
      },
      scrollwheel: false,
      streetViewControl: false,
      mapTypeControl: false,
      mapTypeId: 'roadmap',
    });
    var myCenter = new window.google.maps.LatLng(11.0547843,  106.66559959999995);
    var marker = new window.google.maps.Marker({
      position: myCenter,
      title: 'Vietnamese-German University'
    });
    marker.setMap(map);
  }

  _handleSearch(query) {
    if (!query) {
      return;
    }
    if (this.timeout) clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      fetch(`https://nominatim.openstreetmap.org/search.php?q=${query}&polygon_geojson=1&format=json`)
      .then(resp => resp.json())
      .then(data => {
        let filterGeoJsonType = data.filter(function(data){
          return data.geojson.type === "MultiPolygon" || data.geojson.type === "Polygon"
        });
        this.setState({options: filterGeoJsonType});
      });
    }, 1000)
  }

  renderCoordinate(paths){
    coordinates = [];
    let position = 0;
    paths.map((location) =>{
        if(position %10 === 0){
          coordinates.push({"lat": location[1], "lng": location[0]});
          bounds.extend({"lat": location[1], "lng": location[0]});
        }
        position++
        return true;
    });
  }

  renderToMaps (selectedOptions) {
    selectedOptions.forEach((option) => {

      if(option.geojson.type === "MultiPolygon"){
        this.renderCoordinate(option.geojson.coordinates[0][0]);
      }else if(option.geojson.type === "Polygon"){
        this.renderCoordinate(option.geojson.coordinates[0]);
      }else{
        alert('option.geojson.type: MultiPolygon & Polygon');
      }
       
      if(coordinates.length > 1){
        sub_area = new window.google.maps.Polygon({
          paths: coordinates,
          strokeColor: color[1],
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: color[1],
          fillOpacity: 0.35,
          editable: true
        });

        sub_area.setMap(map);
        map.setOptions({ maxZoom: 15 });
        map.fitBounds(bounds);

        coordinates = [];
      }

    })
  }

  _handleChange (option) {
    this._initMap()
    this.renderToMaps(option)
  }

  render() {
    return (
        <div className="container" style={{height: `100%`}}>
            <h3 class="w3-center">CONTACT</h3>
            <p class="w3-center w3-large">Let's get in touch. Send us a message:</p>
            <div class="w3-center w3-row-padding" >
                <p><i class="fa fa-map-marker fa-fw w3-xxlarge w3-margin-right  "></i> Le Lai Street, Hoa Phu Ward, Thu Dau Mot City, Binh Duong Province, Vietnam</p>
                <p><i class="fa fa-phone fa-fw w3-xxlarge w3-margin-right"></i> Phone: +841293065737</p>
                <p><i class="fa fa-envelope fa-fw w3-xxlarge w3-margin-right"> </i> Email: motorbikeforum@gmail.com</p>
                <br/>
                
            </div>
            <br></br>&nbsp;
            <div className="maps" id="map"></div>
        </div>
    );
  }
}

export default Contact;
