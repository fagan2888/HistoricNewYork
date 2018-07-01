import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {LayersConsumer} from '../contexts/LayersProvider';
import {Icon} from 'leaflet';

const searchIcon = new Icon({
  iconUrl: 'targetIcon.png',
  shadowUrl: 'targetIcon.png',

  iconSize: [50, 50], // size of the icon
  shadowSize: [50, 50], // size of the shadow
  iconAnchor: [25, 25], // point of the icon which will correspond to marker's location
  shadowAnchor: [25, 25], // the same for the shadow
});

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
        {context => (
          <Map
            viewport={context.viewport}
            onViewportChange= { (v) => context.setMapViewport(v)}
            style={{zIndex: 1, height: '100%'}}
            onClick={loc => context.setLocationFliter(loc.latlng)}>
            <TileLayer
              attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
              url="http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
            {context.selectedMaps.map(map => (
              <TileLayer
                attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                url={map.tile_url}
                opacity={map.opacity / 100.0}
                key={map.uuid}
              />
            ))}
            {context.locationFilter ? (
              <Marker
                style={{zIndex: 21}}
                position={ [ context.locationFilter[1] , context.locationFilter[0]]}
                icon={searchIcon}
              />
            ) : null}
            }}
          </Map>
        )}
      </LayersConsumer>
    );
  }
}

export default MapContainer;
