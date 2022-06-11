import React from 'react'
import { TileLayer } from 'react-leaflet'
import {Map as LeafletMap} from 'react-leaflet'
import './Map.css'
import {showDataOnMap} from './util'

function Map({center,zoom,mapCountries,casesType}) {
    //console.log("MAPPPP",mapCountries);
  return (
    <div className='map'>
        <LeafletMap center={center} zoom={zoom}>
            <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
            {
            showDataOnMap(mapCountries,casesType)
            }
        </LeafletMap>
        
        
        </div>
  )
}

export default Map