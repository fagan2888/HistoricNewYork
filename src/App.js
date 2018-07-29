import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import MapContainer from './components/Map';
import Timeline from './components/Timeline';
import LayerControls from './components/LayerControls';
import ShareModal from './components/ShareModal';
import VerticalTimeLine from './components/VerticalTimeLine';
import Legend from './components/Legend'
import LayersProvider from './contexts/LayersProvider'

class App extends Component {


  render() {
    return (
      <div className="App">
          <LayersProvider>
            <MapContainer/>
            <LayerControls/>
            <Legend />
            <ShareModal />
          </LayersProvider>
      </div>
    );
  }
}

export default App;
