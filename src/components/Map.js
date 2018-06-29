import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {LayersConsumer} from '../contexts/LayersProvider'

class MapContainer extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const position = [40.71248, -74.007994];
    return (
      <LayersConsumer>
        {(context)=>(
          <Map center={position} zoom={12} style={{zIndex: 1, height: '100%'}}>
            <TileLayer
              attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
              url="http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
            {context.selectedMaps.map(map => (
              <TileLayer
                attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                url={map.data.tileUrl}
                opacity={map.opacity/100.0}
                key = { map.data.uuid}
              />
            ))}
            <Marker style={{zIndex: 21}} position={position}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </Map>
        )}
      </LayersConsumer>
    );
  }
}

export default MapContainer;
