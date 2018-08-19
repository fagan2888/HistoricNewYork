import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import MapContainer from './components/Map';
import LayerControls from './components/LayerControls';
import ShareModal from './components/ShareModal';
import AboutModal from './components/AboutModal';
import VerticalTimeLine from './components/VerticalTimeLine';
import Legend from './components/Legend';
import LayersProvider from './contexts/LayersProvider';
import {LeafletConsumer} from 'react-leaflet'

class App extends Component {
  render() {
    return (
      <div className="App">
        <LayersProvider>
          <MapContainer />
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
