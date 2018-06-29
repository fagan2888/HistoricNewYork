import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import MapContainer from './components/Map';
import Timeline from './components/Timeline';
import Details from './components/Details';
import LayerControls from './components/LayerControls';
import VerticalTimeLine from './components/VerticalTimeLine';
import LayersProvider from './contexts/LayersProvider'

class App extends Component {


  render() {
    return (
      <div className="App">
          <LayersProvider>
            <MapContainer/>
            <LayerControls/>
          </LayersProvider>
      </div>
    );
  }
}

export default App;
