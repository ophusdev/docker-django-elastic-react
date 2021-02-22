import React, { Fragment } from 'react'
import {Marker} from 'react-leaflet';
import MarkerPopup from './MarkerPopup';
import 'leaflet/dist/leaflet.css';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'


const MarkersMap = (props) => {
  const { stationData } = props;

  console.log(props);

  const markers = stationData.map((ev, index) => {
        return <Marker key={index} position={[ev.geometry.coordinates[1], ev.geometry.coordinates[0]]} 
        icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
            <MarkerPopup data={ev.properties.name}></MarkerPopup>
        </Marker>
  })
  

  return <Fragment>{markers}</Fragment>
};

export default MarkersMap;