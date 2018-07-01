import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {MainText} from '../Typeography';
import Slider from 'rc-slider';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import 'rc-slider/assets/index.css';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

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
      <div>
        <div>
          {this.props.locationFilter ? (
            <MainText>
              Location Filter: {this.props.locationFilter[0].toFixed(2)},{' '}
              {this.props.locationFilter[1].toFixed(2)}
              <a href='#' onClick={(e)=>this.props.setLocationFliter(null)}>clear</a>
            </MainText>
          ) : (
            <MainText>Click on the map to filter by location</MainText>
          )}
        </div>
        <Range
          min={1700}
          max={2000}
          step={1}
          value={this.props.dateFilter}
          pushable
          onChange={val => this.props.setDateFilter(val)}
        />
        <input
          type={'text'}
          value={this.props.textFilter}
          onChange={e => this.props.setTextFilter(e.target.value)}
        />
        <div />
        <div>
          <MainText>Map size:</MainText>
          <CheckboxGroup value={this.props.sizeFilter} onChange={(v)=>{this.props.setSizeFilter(v)}}>
            <Checkbox value='Block'/> Block
            <Checkbox value='Neighborhood'/> Neighborhood
            <Checkbox value='City'/> City
            <Checkbox value='Country'/> Country
          </CheckboxGroup>
        </div>
      </div>
    );
  }
}

export default Filters;
