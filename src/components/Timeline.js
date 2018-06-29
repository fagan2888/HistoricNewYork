import React, { Component} from 'react';
import PropTypes from 'prop-types';
import HorizontalTimeline from 'react-horizontal-timeline'


class Timeline extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };

  state = { value: 0, previous: 0 };
  constructor(props) {
    super(props);
  }

  render(){
    const values  = this.props.maps.map(m=> parseInt(m.validSince)).map(m=> m + '-01-10')
    console.log(values)
    return (
      <div style={{zIndex:20, position:'absolute', width:'100%', height:100, left:0, bottom:0, backgroundColor:'white', boxSizing:'border-box', }}>
        <HorizontalTimeline
            index={this.state.value}
            indexClick={(index) => {
              this.setState({ value: index, previous: this.state.value });

              this.props.onDateChange(this.props.maps[index]);
            }}
            values={values } />
      </div>
    );
  }
}

export default Timeline;
