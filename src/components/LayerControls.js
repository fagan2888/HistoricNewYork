import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {Tiny, MainText, SubHeading, Heading} from '../Typeography';
import VerticalTimeLine from './VerticalTimeLine';
import {LayersConsumer} from '../contexts/LayersProvider';
import Filters from './Filters';

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
    height: 300px
    width:100%;
  }
`;

class LayerControls extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };
  state = {selectedTab: 'LayerSearch', showFilters: true};
  constructor(props) {
    super(props);
    this.updateDimensions = this.updateDimensions.bind(this);
  }
  updateDimensions() {
    this.setState({width: window.innerWidth, height: window.innerHeight});
  }
  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  slicedMaps(maps, page, limit) {
    return maps.slice(page * limit, (page + 1) * limit);
  }

  render() {
    return (
      <LayersConsumer>
        {context =>
          context.editable && (
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
                totalResults={context.totalResults}
                page={context.page}
                noPages={context.noPages}
                onNextPage={context.goToNextPage}
                onPreviousPage={context.goToPrevPage}
              />
              <VerticalTimeLine
                maps={this.slicedMaps(
                  context.filteredMaps,
                  context.page,
                  context.limit,
                )}
                onShowToggle={id => context.toggleMap(id)}
                onZoomToMap={context.zoomToMap}
              />
              }
              <div>
                <Tiny style={{color: 'white'}} onClick={context.showAboutModal}>
                  About
                </Tiny>
              </div>
            </LayerControlsContainer>
          )
        }
      </LayersConsumer>
    );
  }
}

export default LayerControls;
