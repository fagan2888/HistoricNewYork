import React  from 'react'
import styled from 'styled-components'
import {Tiny} from './Typeography'

export const DateRange = (props) =>(
  <div style={{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '10px',
    borderBottom: '1px solid white',
  }}>
    <Tiny>{props.validSince}</Tiny>
    { props.validSince !== props.validUntil ? (
      <React.Fragment>
        <Tiny>-</Tiny>
        <Tiny>{props.validUntil}</Tiny>)
      </React.Fragment>)
      : ''
    }
  </div>
)

export const MapThumb = (props)=>(
    <a href={props.link} target="_blank">
      <LazyImage

        src={`https://images.nypl.org/index.php?id=${
          props.imageID
        }&t=r&download=1`}
        alt="props.imageID"
        placeholder={({ imageProps, ref }) => (
          <img ref={ref} src="/img/porto_buildings_lowres.jpg" alt={imageProps.alt} />
        )}
        actual={({ imageProps }) => <img {...imageProps}
        style={props.style}
            />}
      />
      <img
      />
    </a>
)
export const TimeLineEntryContents = styled.div`
  color: white;
  width: 90%;
`;

export const TimeLineSegment = () => (
  <div style={{position: 'relative', width: '20px', marginLeft:'25px'}}>
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
