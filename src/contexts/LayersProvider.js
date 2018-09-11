import React from 'react';
import * as turf from '@turf/turf';
import createHistory from 'history/createBrowserHistory';
import {withLeaflet} from 'react-leaflet'

const history = createHistory({basename: process.env.PUBLIC_URL + '/'});

const LayersContext = React.createContext();
const position = [40.71248, -74.007994];

class LayersProvider extends React.Component {
  state = {
    maps: null,
    selectedMaps: [],
    fetchedMaps: [],
    locationFilter: null,
    dateFilter: [1800, 1900],
    sizeFilter: [],
    editable: true,
    shareModalVisible: false,
    aboutModalVisible: false,
    viewport: {
      center: position,
      zoom: 12,
    },
    haveReadInitalURLState:false,
    filteredMaps: [],
    textFilter: '',
    toggleMap: this.toggleMap.bind(this),
    updateOpacity: this.updateOpacity.bind(this),
    setLocationFliter: this.setLocationFliter.bind(this),
    setMapElement: this.setMapElement.bind(this),
    setDateFilter: this.setDateFilter.bind(this),
    setTextFilter: this.setTextFilter.bind(this),
    setSizeFilter: this.setSizeFilter.bind(this),
    setMapViewport: this.setMapViewport.bind(this),
    makeMapEditable: this.makeMapEditable.bind(this),
    blankSlate: this.blankSlate.bind(this),
    zoomToMap: this.zoomToMap.bind(this),
    showShareModal: this.showShareModal.bind(this),
    showAboutModal: this.showAboutModal.bind(this),
    closeShareModal: this.closeShareModal.bind(this),
    closeAboutModal: this.closeAboutModal.bind(this),
    getSelectedMapsWithDetails: this.getSelectedMapsWithDetails.bind(this),
    encodeShareStateToHash: this.encodeShareStateToHash.bind(this),
    goToNextPage: this.goToNextPage.bind(this),
    goToPrevPage: this.goToPrevPage.bind(this),
    //getShortURL : this.getShortURL.bind(this),
    page: 0,
    limit: 20,
    mapsCSVLoaded: false,
    mapGeoJSONCache: [],
  };

  // This is a crappy hack... fix it at some point to use the map reference

  areaCategory(area) {
    if (area < 10) {
      return 'Block';
    }
    if (area <  32.08029) {
      return 'Neighborhood';
    }
    if (area < 2000) {
      return 'City';
    } else {
      return 'Country';
    }
  }

  setMapElement(map){
    this.map = map
  }

  goToNextPage() {
    this.setState({
      page: Math.min(this.state.page + 1, this.state.noPages),
    });
  }

  goToPrevPage() {
    this.setState({
      page: Math.max(this.state.page - 1, 0),
    });
  }

  //loadMapsCSV() {
    //fetch('maps.csv')
      //.then(res => res.text())
      //.then(csv => Papa.parse(csv, {header: true}))
      //.then(result => {
        //this.setState({maps: result.data, mapsCSVLoaded: true});
      //});
  //}
  //loadMapFromGEOJson(uuid) {
    //fetch(`map_details/${uuid}.geojson`)
      //.then(res => res.json())
      //.then(geo => {});
  //}
  componentWillMount() {
    fetch('maps.geojson')
      .then(m => m.json())
      .then(r => {
        this.setState({maps: r}, () => {
          this.extractStateFromHash();
          this.filterMaps();
        });
      });
    this.unlisten = history.listen(this.locationChanged.bind(this));
  }

  locationChanged(location, action) {
    this.extractStateFromHash();
  }

  makeMapEditable() {
    this.setState(
      {
        editable: true,
      },
      this.encodeStateToHash.bind(this),
    );
  }

  blankSlate() {
    this.setState(
      {
        editable: true,
        selectedMaps: [],
      },
      this.encodeStateToHash.bind(this),
    );
  }

  encodeShareStateToHash() {
    if(this.state.haveReadInitalURLState){
      const serializableState = {
        viewport: this.state.viewport,
        editable: false,
        selectedMaps: this.state.selectedMaps.map(map => ({
          opacity: map.opacity,
          uuid: map.uuid,
        })),
      };
      const hashFrag = btoa(JSON.stringify(serializableState));
      const base = window.location.href.split('/').slice(0,-1).join('/')
      const url = `${base}/${hashFrag}`;
      return(url)
    }
  }

  encodeStateToHash() {
    const serializableState = {
      viewport: this.state.viewport,
      editable: this.state.editable,
      selectedMaps: this.state.selectedMaps.map(map => ({
        opacity: map.opacity,
        uuid: map.uuid,
      })),
    };

    const hashFrag = btoa(JSON.stringify(serializableState));
    history.push(hashFrag);
  }

  extractStateFromHash() {
    const hash = history.location.pathname.slice(1);
    try {
      const serializableState = JSON.parse(atob(hash));
      console.log("inital state ", serializableState)
      this.setState({
        ...serializableState,
        haveReadInitalURLState: true
      });
    } catch (e) {
      window.location.hash = '';
    }
  }

  render() {
    return (
      <LayersContext.Provider value={this.state}>
        {this.props.children}
      </LayersContext.Provider>
    );
  }

  zoomToMap(uuid) {
    const map = this.state.maps.features.filter(
      map => map.properties.uuid === uuid,
    )[0];
    const boundingBox =turf.bbox(map.geometry);
    const bounds = [[boundingBox[1], boundingBox[0]],[boundingBox[3],boundingBox[2]]]
    this.props.map.fitBounds(bounds)
  }

  setMapViewport(viewport) {
    this.setState({viewport}, this.encodeStateToHash.bind(this));
  }

  setTextFilter(val) {
    this.setState(
      {
        textFilter: val,
      },
      this.filterMaps,
    );
  }

  setSizeFilter(vals) {
    this.setState(
      {
        sizeFilter: vals,
      },
      this.filterMaps,
    );
  }

  showShareModal() {
    this.setState({
      shareModalVisible: true,
    });
  }

  closeShareModal() {
    this.setState({
      shareModalVisible: false,
    });
  }

  showAboutModal() {
    this.setState({
      aboutModalVisible: true,
    });
  }

  closeAboutModal() {
    this.setState({
      aboutModalVisible: false,
    });
  }

  setLocationFliter(latlng) {
    let newFilter = null;

    if (latlng) {
      newFilter = [latlng.lng, latlng.lat];
    }
    this.setState(
      {
        locationFilter: newFilter,
      },
      this.filterMaps,
    );
  }

  setDateFilter(range) {
    this.setState(
      {
        dateFilter: range,
      },
      this.filterMaps,
    );
  }

  filterMaps() {
    if (this.state.maps === null) {
      return [];
    }
    let result = this.state.maps.features;
    const {page, limit} = this.state;

    result = this.filterSize(result);
    result = this.filterDates(result);
    result = this.filterText(result);
    result = this.filterGometries(result);
    this.setState({
      totalResults: result.length,
      page: 0,
      noPages: Math.ceil(result.length / this.state.limit),
      filteredMaps: result.map(f => f.properties),
    });
  }

  filterDates(maps) {
    return maps.filter(map => {
      return (
        map.properties.validSince > this.state.dateFilter[0] &&
        map.properties.validUntil < this.state.dateFilter[1]
      );
    });
  }

  filterText(maps) {
    if (this.state.textFilter.length == 0) {
      return maps;
    }
    return maps.filter(map => {
      return map.properties.name.indexOf(this.state.textFilter) > -1;
    });
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

  filterSize(maps) {
    let result = maps;

    if (this.state.sizeFilter.length == 0) {
      return result;
    }

    if (this.state.sizeFilter) {
      result = result.filter(map =>
        this.state.sizeFilter.includes(this.areaCategory(map.properties.area)),
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

  getSelectedMapsWithDetails() {
    const result = this.state.selectedMaps.map(details => {
      const map = this.state.maps.features.filter(
        m => m.properties.uuid === details.uuid,
      )[0];
      return {...map.properties, opacity: details.opacity};
    });
    return result;
  }

  toggleMap(uuid) {
    if (this.state.selectedMaps.map(m => m.uuid).includes(uuid)) {
      this.setState(
        {
          selectedMaps: this.state.selectedMaps.filter(m => m.uuid !== uuid),
        },
        this.encodeStateToHash.bind(this),
      );
    } else {
      this.setState(
        {
          selectedMaps: [...this.state.selectedMaps, {uuid, opacity: 50}],
        },
        this.encodeStateToHash.bind(this),
      );
    }
  }
}

export default withLeaflet(LayersProvider)
export const LayersConsumer = LayersContext.Consumer;
