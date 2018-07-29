import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {LayersConsumer} from '../contexts/LayersProvider';
import {Label, Tiny} from '../Typeography';
import LegendEntry from './LegendEntry';
import styled from 'styled-components';

const LegendContainer = styled.div`
  display: flex;
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 30;
  width: 500px;
  flex-direction: column;
  background-color: #456990;
  box-shadow: 10px 10px 52px 4px rgba(0, 0, 0, 0.59);
  box-sizing: border-box;
  padding:20px;
  color:white;
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction:row;
`
class Legend extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <LayersConsumer>
        {context => (
          <LegendContainer>
            {context
              .getSelectedMapsWithDetails()
              .map( (map,index) => (
                  <LegendEntry {...map}
                    onShowToggle={context.toggleMap}
                    onZoomToMap={context.zoomToMap}
                    key = {`map_${index}`}
                    onUpdateOpacity={context.updateOpacity} />
              ))}
              <Actions>
                {!context.editable &&
                  <Label onClick={context.makeMapEditable}>Edit this map</Label>
                }
                <Label onClick={()=> { context.showShareModal()}} >Share this map</Label>
                <Label onClick={context.blankSlate}>Start a new map</Label>
              </Actions>
           </LegendContainer>
        )}
      </LayersConsumer>
    );
  }
}

export default Legend;
