import React from 'react';
import * as turf from '@turf/turf';

const LayersContext = React.createContext();
const position = [40.71248, -74.007994];

export default class LayersProvider extends React.Component {
  state = {
    maps: null,
    selectedMaps: [],
    fetchedMaps: [],
    locationFilter: null,
    dateFilter: [1800, 1900],
    sizeFilter: [],
    viewport: {
      center:position,
      zoom:12
    },
    textFilter: '',
    toggleMap: this.toggleMap.bind(this),
    updateOpacity: this.updateOpacity.bind(this),
    setLocationFliter: this.setLocationFliter.bind(this),
    filteredMaps: this.filteredMaps.bind(this),
    setDateFilter: this.setDateFilter.bind(this),
    setTextFilter: this.setTextFilter.bind(this),
    setSizeFilter: this.setSizeFilter.bind(this),
    setMapViewport: this.setMapViewport.bind(this),
    zoomToMap : this.zoomToMap.bind(this),
    offset: 0,
    limit: 20,
  };

  componentWillMount() {
    fetch('maps.geojson')
      .then(m => m.json())
      .then(r => {
        this.setState({maps: r});
      });
  }

  render() {
    return (
      <LayersContext.Provider value={this.state}>
        {this.props.children}
      </LayersContext.Provider>
    );
  }

  zoomToMap(uuid){
    const map = this.state.maps.features.filter((map)=>map.properties.uuid === uuid)[0]
    console.log(map)
    const boundingBox = turf.bbox(map.geometry)
    console.log(boundingBox)
  }

  setMapViewport(viewport){
    this.setState({viewport})
  }
  setTextFilter(val){
    this.setState({
      textFilter: val
    })
  }

  setSizeFilter(val){
    this.setState({
      sizeFilter: val
    })
  }

  setLocationFliter(latlng) {
    if(latlng){
      this.setState({
        locationFilter: [latlng.lng, latlng.lat],
      });
    }
    else{
      this.setState({
        locationFilter: null
      })
    }
  }

  setDateFilter(range) {
    console.log('updating date filter: ', range);
    this.setState({
      dateFilter: range,
    });
  }

  filteredMaps() {
    if (this.state.maps === null) {
      return [];
    }
    let result = this.state.maps.features;
    result = this.filterGometries(result);
    result = this.filterDates(result);
    result = this.filterText(result);
    return result
      .map(f => f.properties)
      .slice(this.state.offset, this.state.offset + this.state.limit);
  }

  filterDates(maps){
    return maps.filter((map)=>{
      return (map.properties.validSince > this.state.dateFilter[0]  && map.properties.validUntil < this.state.dateFilter[1])
    })
  }

  filterText(maps){
    if (this.state.textFilter.length==0){
      return maps
    }
    return maps.filter((map)=>{
      return map.properties.name.indexOf(this.state.textFilter) > -1
    })
  }

  filterGometries(maps) {
    let result = maps;
    if (this.state.locationFilter) {
      result = result.filter(map =>
        turf.booleanContains(map, turf.point(this.state.locationFilter)),
      );
    }
    return result;
  }

  updateOpacity(mapid, opacity) {
    this.setState({
      selectedMaps: this.state.selectedMaps.map(
        m => (m.uuid === mapid ? {...m, opacity: opacity} : m),
      ),
    });
  }

  toggleMap(uuid) {
    if (this.state.selectedMaps.map(m => m.uuid).includes(uuid)) {
      console.log('removing');
      this.setState({
        selectedMaps: this.state.selectedMaps.filter(m => m.uuid !== uuid),
      });
    } else {
      console.log('adding');
      const selectedMap = this.state.maps.features.filter(
        m => m.properties.uuid === uuid,
      )[0];
      console.log('selecting map ', selectedMap);
      this.setState({
        selectedMaps: [
          ...this.state.selectedMaps,
          {...selectedMap.properties, opacity: 50},
        ],
      });
    }
  }
}

export const LayersConsumer = LayersContext.Consumer;
