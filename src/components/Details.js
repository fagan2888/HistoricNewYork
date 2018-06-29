import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

class Details extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };
  state = {
    opacity: 0,
  };

  constructor(props) {
    super(props);
  }
  updateOpacity(o) {
    this.setState({opacity: o},
      ()=>{
        this.props.onOpacityChange(this.state.opacity)
      });
  }

  render() {
    return (
      <div
        style={{
          width: '200px',
          position: 'absolute',
          top: '20px',
          right: '20px',
          height: '300px',
          zIndex: 20,
          boxSizing: 'border-box',
          padding: '20px',
          backgroundColor: 'white',
        }}>
        <h1>{this.props.map.name}</h1>
        <p>Valid From: {this.props.map.validSince}</p>
        <p>Valid Till: {this.props.map.validUntil}</p>
        <p>{this.props.map.data.description}</p>
        <p>
          <a target="_blank" href={this.props.map.data.nyplUrl}>
            More info
          </a>
        </p>
        <Slider
          value={this.state.opacity}
          min={0}
          max={1}
          step={0.01}
          onChange={o => this.updateOpacity(o)}
        />
      </div>
    );
  }
}

export default Details;
