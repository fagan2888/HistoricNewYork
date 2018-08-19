import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {Tiny,MainText, SubHeading, Heading} from '../Typeography';
import VerticalTimeLine from './VerticalTimeLine';
import {LayersConsumer} from '../contexts/LayersProvider';
import Filters from './Filters';
import 'react-tabs/style/react-tabs.css';

const LayerControlsContainer = styled.div`
  position: absolute;
  background: #456990;
  height: 100%;
  width: 400px;
  box-sizing: border-box;
  padding: 10px
  top: 0;
  left: 0;
  margin:0;
  list-style-type: none;
  z-index:100;
  display:flex;
  flex-direction: column;
  @media(max-width:700px){
    display:none
  }
`;

class LayerControls extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };
  state = {selectedTab: 'LayerSearch'};
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <LayersConsumer>
        {context => (
          (context.editable &&
              <LayerControlsContainer>
                <Heading style={{color: 'white', margin: '10px 0px'}}>
                Historic New York Maps
              </Heading>
              <Filters
                locationFilter={context.locationFilter}
                dateFilter={context.dateFilter}
                sizeFilter={context.sizeFilter}
                textFilter={context.textFilter}
                setDateFilter={context.setDateFilter}
                setTextFilter={context.setTextFilter}
                setSizeFilter={context.setSizeFilter}
                setLocationFliter={context.setLocationFliter}
              />
              <VerticalTimeLine
                maps={context.filteredMaps}
                onShowToggle={id => context.toggleMap(id)}
                onZoomToMap={context.zoomToMap}
              />
              <div>
                <Tiny>About</Tiny>
                <Tiny>Share</Tiny>
              </div>
            </LayerControlsContainer>
          )
        )}
      </LayersConsumer>
    );
  }
}

export default LayerControls;
