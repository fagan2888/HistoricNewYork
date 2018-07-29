import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import {Heading, SubHeading, MainText, Tiny} from '../Typeography';
import {
  DateRange,
  TimeLineEntryContents,
  TimeLineSegment,
  MapThumb,
} from '../CommonElements';

console.log('icons are ', Icons);

const TimeLineEntryContainer = styled.li`
  list-style-type: none;
  position: relative;
  width: 100%;
  background: 'transparent';
  display: flex;
  flex-direction: row;
  align-items: 'stretch';
`;

function TimelineEntry({...props}) {
  return (
    <TimeLineEntryContainer>
      <TimeLineEntryContents>
        <DateRange>
          <Tiny>{props.validSince}</Tiny> <Tiny>-</Tiny>
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
        <SubHeading>{props.title}</SubHeading>
        <a href={props.link} target="_blank">
          <MapThumb style={{maxWidth: '300px'}} imageID={props.imageID} />
        </a>
        <MainText style={{paddingLeft: '10px'}}>{props.description}</MainText>
      </TimeLineEntryContents>
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
