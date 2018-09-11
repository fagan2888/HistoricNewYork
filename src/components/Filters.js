import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {MainText} from '../Typeography';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import {Label} from '../Typeography';

import {Tiny} from '../Typeography';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/fontawesome-free-solid';

import styled from 'styled-components';



const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
const Handle = Slider.Handle

const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
      style={{zIndex:200000}}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 0px 10px;
`;

const Filter = styled.div`
  display: flex;
  flex-direction: rows;
  color: white;
  align-items: center
  margin-bottom:10px;
`;
class Filters extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <FilterContainer>
        <Filter>
          <FontAwesomeIcon
            icon={Icons.faCompass}
            size="1x"
            style={{color: 'white', marginRight: '10px'}}
          />
          {this.props.locationFilter ? (
            <Label style={{color: 'white', margin: '0px'}}>
              Location Filter: {this.props.locationFilter[0].toFixed(2)},{' '}
              {this.props.locationFilter[1].toFixed(2)}
              <FontAwesomeIcon
                icon={Icons.faTimes}
                size="1x"
                style={{ marginLeft:'10px', color:'hwite', textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)'}}
                onClick={e => this.props.setLocationFliter(null)}
              />
            </Label>
          ) : (
            <Label>Click on the map to filter by location</Label>
          )}
        </Filter>

        <Filter
          style={{
            display: 'flex',
            flexDirection: 'rows',
            marginBottom: '10px',
          }}>
          <FontAwesomeIcon
            icon={Icons.faClock}
            size="1x"
            style={{color: 'white', marginRight: '10px'}}
          />
          <div style={{display:'flex', width:'100%',flexDirection:'row', alignItems:'center'}} >
            <Tiny style={{marginRight:'10px'}}>
              {this.props.dateFilter[0]}
            </Tiny>
            <Range
              min={1700}
              max={2000}
              step={1}
              value={this.props.dateFilter}
              pushable
              onChange={val => this.props.setDateFilter(val)}
              tipFormatter={(val)=>val}
            />
            <Tiny style={{marginLeft:'10px'}}>
              {this.props.dateFilter[1]}
            </Tiny>
          </div>
        </Filter>
        <Filter>
          <FontAwesomeIcon
            icon={Icons.faAlignLeft}
            size="1x"
            style={{color: 'white', marginRight: '10px'}}
          />
          <input
            type={'text'}
            value={this.props.textFilter}
            onChange={e => this.props.setTextFilter(e.target.value)}
            style={{flex: 1}}
            placeholder="Search descriptions"
          />
        </Filter>
        <Filter>
          <FontAwesomeIcon
            icon={Icons.faSquare}
            size="1x"
            style={{color: 'white', marginRight: '10px'}}
          />
          <CheckboxGroup
            style={{
              flex:1,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            value={this.props.sizeFilter}
            onChange={v => {
              this.props.setSizeFilter(v);
            }}>
            <Checkbox value="Block" /> <Label>Block</Label>
            <Checkbox value="Neighborhood" /> <Label>Neighborhood</Label>
            <Checkbox value="City" /> <Label>City</Label>
            <Checkbox value="Country" /> <Label>Country</Label>
          </CheckboxGroup>
        </Filter>
        <Filter
            style={{
              flex:1,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
          <Tiny onClick={this.props.onPreviousPage}>Prev</Tiny>

          <Tiny>{this.props.totalResults} Results</Tiny>
          <Tiny>Page: {this.props.page + 1} of {this.props.noPages}</Tiny>
          <Tiny onClick={this.props.onNextPage}>Next</Tiny>

        </Filter>
      </FilterContainer>
    );
  }
}

export default Filters;
