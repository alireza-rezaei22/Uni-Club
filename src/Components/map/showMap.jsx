"use client"

import { Marker, TileLayer } from "react-leaflet"
import { MapBase } from "./mapBase"

function ShowMap({location}) {  
  return (
    <MapBase center={location}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution=''
      />
      
      <Marker position={location} />
    </MapBase>
  )
}

export default ShowMap