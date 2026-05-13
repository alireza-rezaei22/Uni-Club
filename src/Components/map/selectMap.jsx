"use client"

import { Marker, TileLayer, useMapEvents } from "react-leaflet"
import { MapBase } from "./mapBase"
import { useEffect, useState } from "react"

function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng)
    },
  })
  return null
}

function SelectMap({ setLocationProp }) {
  const [location, setLocation] = useState(null)

  const handleMapClick = (latlng) => {
    setLocation([latlng.lat, latlng.lng])
  }

  useEffect(() => {
    setLocationProp(location)
  }, [location])

  return (
    <MapBase
      center={[35.6892, 51.3890]}
    >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler onMapClick={handleMapClick} />
        {location && <Marker position={location} />}
    </MapBase>
  )
}

export default SelectMap
