import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Timeline from 'react-dual-timeline';
import TimelineEntry from './TimelineEntry';
import {StyleRoot} from 'radium';
import styled from 'styled-components';

const OuterTimeLine = styled.ul`
  flex: 1;
  background: #456990;
  height: 100%;
  box-sizing: border-box;
  padding: 10px
  margin:0;
  list-style-type: none;
  z-index:100;
  overflow-y: scroll;
`;

class VerticalTimeLine extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    maps: PropTypes.Array,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <OuterTimeLine>
        {this.props.maps.map(map => (
          <TimelineEntry
            key={map.name}
            title={map.name}
            description={map.description}
            validSince={map.validSince}
            validUntil={map.validUntil}
            showControlls={this.props.showControlls}
            opacity={map.opacity}
            mapType="area"
            mapLink="http://somelink.com"
            uuid={map.uuid}
            imageID = {map.imageID}
            onShowToggle={this.props.onShowToggle}
            link={map.link}
            onOpacityUpdated={v =>
              this.props.onOpacityUpdated(map.uuid, v)
            }
            onZoomToMap={this.props.onZoomToMap}
          />
        ))}
      </OuterTimeLine>
    );
  }
}

export default VerticalTimeLine;
