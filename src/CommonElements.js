import React  from 'react'
import styled from 'styled-components'

export const DateRange = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
  border-bottom: 1px solid white;
  width: 20%;
`;

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
