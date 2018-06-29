import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Timeline from 'react-dual-timeline';
import TimelineEntry from './TimelineEntry';
import {StyleRoot} from 'radium';
import styled from 'styled-components';

const OuterTimeLine = styled.ul`
  position: absolute;
  background: #456990;
  height: 100%;
  width: 100%;
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
            description={map.data.description}
            validSince={map.validSince}
            validUntil={map.validUntil}
            showControlls={this.props.showControlls}
            opacity={map.opacity}
            mapType="area"
            mapLink="http://somelink.com"
            uuid={map.data.uuid}
            imageID = {map.data.imageId}
            onShowToggle={this.props.onShowToggle}
            onOpacityUpdated={v =>
              this.props.onOpacityUpdated(map.data.uuid, v)
            }
          />
        ))}
      </OuterTimeLine>
    );
  }
}

export default VerticalTimeLine;