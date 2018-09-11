import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {LayersConsumer} from '../contexts/LayersProvider';
import {Heading, Label, Tiny} from '../Typeography';
import LegendEntry from './LegendEntry';
import styled from 'styled-components';

const LegendContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 30;
  width: 300px;
  background-color: #456990;
  box-shadow: 10px 10px 52px 4px rgba(0, 0, 0, 0.59);
  box-sizing: border-box;
  padding: 20px;
  color: white;

  @media (max-width: 700px) {
    top:auto;
    right: auto;
    left:0px
    bottom:0px;
    width: 100%;
    height: 250px;
  }
`;

const LegendContainerInner = styled.div`
  max-height: 600px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;

  @media (max-width: 700px) {
    display: auto;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: -ms-autohiding-scrollbar;
    height: 100%;
    overflow-y: hidden;
    overflow-x:scroll
    flex-direction: row;
    width:auto;
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;
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
        {context => {
          if (context.selectedMaps.length > 0) {
            return (
              <LegendContainer>
                {!context.editable && (
                  <Heading style={{color: 'white', margin: '10px 0px'}}>
                    Historic New York Maps
                  </Heading>
                )}

                <LegendContainerInner>
                  {context
                    .getSelectedMapsWithDetails()
                    .map((map, index) => (
                      <LegendEntry
                        {...map}
                        onShowToggle={context.toggleMap}
                        onZoomToMap={context.zoomToMap}
                        key={`map_${index}`}
                        onUpdateOpacity={context.updateOpacity}
                      />
                    ))}
                </LegendContainerInner>

                <Actions>
                  {!context.editable && (
                    <Label onClick={context.makeMapEditable}>
                      Edit this map
                    </Label>
                  )}
                  <Label
                    onClick={() => {
                      context.showShareModal();
                    }}>
                    Share
                  </Label>
                  {context.editable ? (
                    <Label onClick={context.blankSlate}>New Map</Label>
                  ) : (
                    <Label onClick={context.showShareModal}>About</Label>
                  )}
                </Actions>
              </LegendContainer>
            );
          }
        }}
      </LayersConsumer>
    );
  }
}

export default Legend;
