import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';
import {Heading, SubHeading, MainText, Tiny} from '../Typeography';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const TimeLineEntryContainer = styled.li`
  list-style-type: none;
  position: relative;
  width: 100%;
  background: 'transparent';
  display: flex;
  flex-direction: row;
  align-items: 'stretch';
`;

const TimeLineSegment = () => (
  <div style={{position: 'relative', width: '20px', marginLeft:'8px'}}>
    <div
      style={{
        height: '100%',
        width: '5px',
        left: '80%',
        transform: 'translate(-2.5px,-2.5px)',
        backgroundColor: 'white',
        position: 'absolute',
      }}
    />

    <div
      style={{
        top: '50%',
        left: '80%',
        width: '20px',
        height: '20px',
        position: 'absolute',
        borderRadius: '20px',
        position: 'absolute',
        transform: 'translate(-10px,-10px)',
        backgroundColor: 'white',
      }}
    />
  </div>
);

const Contents = styled.div`
  color: white;
  width: 90%;
`;

const DateRange = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
  border-bottom: 1px solid white;
  width: 20%;
`;

function TimelineEntry({...props}) {
  return (
    <TimeLineEntryContainer>
      <Contents>
        <DateRange>
          <Tiny>{props.validSince}</Tiny> <Tiny>-</Tiny>
          <Tiny>{props.validUntil}</Tiny>
        </DateRange>
        <FontAwesome
          className="map-button"
          name="date"
          size="1x"
          style={{textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)'}}
          onClick={() => {
            props.onShowToggle(props.uuid);
          }}
        />
        <FontAwesome
          className="vector-square"
          name="map"
          size="1x"
          style={{textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', color:'white'}}
          onClick={() => {
            props.onZoomToMap(props.uuid);
          }}
        />
        {props.showControlls && (
          <Slider
            value={props.opacity}
            onChange={val => props.onOpacityUpdated(val)}
            min={0}
            max={100}
            step={1}
          />
        )}
        <SubHeading>{props.title}</SubHeading>
        <img src={`https://images.nypl.org/index.php?id=${props.imageID}&t=r&download=1`} />
        <MainText style={{paddingLeft: '10px'}}>{props.description}</MainText>
      </Contents>
      <TimeLineSegment />
    </TimeLineEntryContainer>
  );
}

TimelineEntry.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  validSince: PropTypes.number,
  validUntil: PropTypes.number,
  mapType: PropTypes.oneOf(['area', 'city', 'state', 'us']),
  mapLink: PropTypes.string,
};

export default TimelineEntry;
