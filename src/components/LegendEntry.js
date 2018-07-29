import React from 'react';
import PropTypes from 'prop-types';
import {
  DateRange,
  TimeLineEntryContents,
  TimeLineSegment,
  MapThumb,
} from '../CommonElements.js';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/fontawesome-free-solid';
import {Tiny, MainText} from '../Typeography.js';
import Slider from 'rc-slider';
import styled from 'styled-components';

import 'rc-slider/assets/index.css';

const LedgendEntryContainer = styled.div`
  color: white;
`;

const TitleAndImage = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
function LegendEntry({...props}) {
  return (
    <LedgendEntryContainer>
      <DateRange>
        <Tiny>{props.validSince}</Tiny>
        <Tiny>{props.validUntil}</Tiny>
      </DateRange>

      <FontAwesomeIcon
        className="map-button"
        icon={Icons.faMap}
        size="1x"
        style={{textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)'}}
        onClick={() => {
          props.onShowToggle(props.uuid);
        }}
      />
      <FontAwesomeIcon
        className="map-button"
        icon={Icons.faEye}
        size="1x"
        style={{textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)'}}
        onClick={() => {
          props.onZoomToMap(props.uuid);
        }}
      />
      <TitleAndImage>
        <MapThumb
          imageID={props.imageID}
          style={{width: '150px', marginRight: '20px'}}
        />
        <MainText>{props.name}</MainText>
      </TitleAndImage>
      <Slider
        min={0}
        max={100}
        step={1}
        value={props.opacity}
        onChange={val => props.onUpdateOpacity(props.uuid, val)}
      />
    </LedgendEntryContainer>
  );
}

LegendEntry.defaultProps = {};

LegendEntry.propTypes = {};

export default LegendEntry;
