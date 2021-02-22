import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer , Marker, Popup, useMapEvents, MapConsumer} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from "leaflet";
import MarkersMap from './MarkersMap'
import icon from "./icon";

function MapGrid() {

  const [center, setCenter] = useState({lat: 44.7934065, lng:  10.8823226})
  const [zoom, setZoom] = useState(8)
  const [stationData, setStationData] = useState([])

  function fetchData() {
      fetch(`http://localhost:8000/stations?lat=${center.lat}&lng=${center.lng}&zoom=${zoom}`)
      .then(res => (res.ok ? res : Promise.reject(res)))
      .then(res => res.json())
      .then(res => setStationData(res))
      .catch(function() {
        alert("error fetch data")
    })
  }

  function LocateStation() {

    const map = useMapEvents({
      click: (e) => {
       
        const { lat, lng } = e.latlng;
        //L.marker([lat, lng], { icon }).addTo(map);
        setCenter({'lat': lat, 'lng': lng})
        fetchData();
      }
    });
    return null;
  }
  

    return (
      <MapContainer
        center={center} 
        zoom={zoom} 
      >
        <LocateStation></LocateStation>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MarkersMap stationData={stationData}/>
        
    </MapContainer>
    );
  }

export default MapGrid;