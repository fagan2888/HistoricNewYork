import React from 'react';
import maps from '../maps';

const LayersContext = React.createContext();

export default class LayersProvider extends React.Component {
  state = {
    maps: maps.sort((a, b) => parseInt(a.validSince) - parseInt(b.validSince)),
    selectedMaps: [],
    toggleMap: this.toggleMap.bind(this),
    updateOpacity: this.updateOpacity.bind(this),
    fetchedMaps: [],
  };

  componentWillMount() {
    fetch('/maps.geojson')
      .then(m => m.json())
      .then(r => {
        this.setState({fetchedMaps: r});
      });
  }
  render() {
    return (
      <LayersContext.Provider value={this.state}>
        {this.props.children}
      </LayersContext.Provider>
    );
  }

  updateOpacity(mapid, opacity) {
    this.setState({
      selectedMaps: this.state.selectedMaps.map(
        m => (m.data.uuid === mapid ? {...m, opacity: opacity} : m),
      ),
    });
  }

  toggleMap(uuid) {
    if (this.state.selectedMaps.map(m => m.data.uuid).includes(uuid)) {
      console.log('removing');
      this.setState({
        selectedMaps: this.state.selectedMaps.filter(m => m.data.uuid !== uuid),
      });
    } else {
      console.log('adding');
      const selectedMap = this.state.maps.filter(m => m.data.uuid === uuid)[0];
      this.setState({
        selectedMaps: [
          ...this.state.selectedMaps,
          {...selectedMap, opacity: 50},
        ],
      });
    }
  }
}

export const LayersConsumer = LayersContext.Consumer;
