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
  @media (max-width: 700px) and (max-device-width : 700px)  {
    height:100%;
    width: 300px;
    margin-right: 20px
  }
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
      <div style={{display:'flex', flexDirection: 'row', justifyContent:'space-between',alignItems:'center'}}>

        <DateRange validSince={props.validSince} validUntil={props.validUntil} />

        <FontAwesomeIcon
          className="map-button"
          icon={Icons.faMap}
          size="1x"
          style={{textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', marginLeft:'auto'}}
          onClick={() => {
            props.onShowToggle(props.uuid);
          }}
        />
        <FontAwesomeIcon
          className="map-button"
          icon={Icons.faEye}
          size="1x"
          style={{textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', marginRight:'0px'}}
          onClick={() => {
            props.onZoomToMap(props.uuid);
          }}
        />
      </div>

      <TitleAndImage>
        <MapThumb
          imageID={props.imageID}
          style={{width:'100%', height:'100%'}}
          link ={props.link}
        />
      </TitleAndImage>

      <MainText style={{margin:'10px 0px 0px 0px'}}>{props.name}</MainText>


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
