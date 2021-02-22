import React, { Component } from 'react'
import { MapContainer, TileLayer , Marker, Popup} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import MarkersMap from './MarkersMap'


class Mapa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: { 
        lat: 44.7934065,
        lng:  10.8823226
      },
      zoom: 8,
      stationData : [],
      currentPos: null
    }

    //this.fetchEvents();
    this.handleClick = this.handleClick.bind(this);
  }

  /*fetchEvents = async () => {

    const res = await fetch(`http://localhost:8000/stations?lat=${this.state.center.lat}&lng=${this.state.currentLocation.lng}&zoom=${this.state.zoom}`)
    const stations  = await res.json()

    //this.setState({stationData: stations})
  }*/

  handleClick(e) {
    console.log(e);
    this.setState({ currentPos: e.latlng });
  }


  render() {

    return (
      <MapContainer 
        center={this.state.center} 
        zoom={this.state.zoom} 
        onClick={this.handleClick}
      >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <MarkersMap stationData={this.state.stationData}/>
    </MapContainer>
    );
  }
}

export default Mapa;