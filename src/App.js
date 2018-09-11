import React, {Component} from 'react';
import logo from './logo.svg';
import MapContainer from './components/Map';
import LayerControls from './components/LayerControls';
import ShareModal from './components/ShareModal';
import AboutModal from './components/AboutModal';
import VerticalTimeLine from './components/VerticalTimeLine';
import Legend from './components/Legend';
import LayersProvider from './contexts/LayersProvider';
import {LeafletConsumer,LeafletProvider} from 'react-leaflet'
import styled from 'styled-components'
import './App.css';

//TODO Must be a better way to get the map object
class App extends Component {

  state= {}
  render() {
    return (
      <div className="App">
          <LayersProvider map={this.state.map} >
            <MapContainer  onHaveMap={(map) => this.setState({map})} />
          <LayerControls />
          <Legend />
          <ShareModal />
          <AboutModal />
        </LayersProvider>
      </div>
    );
  }
}

export default App;
