import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';



const ModalOuter = styled.div`
  width: 100%;
  height:100%;
  background-color: rgba(0,0,0,0.6);
  z-index:1000;
  position:absolute;
  width: 100%;
  height: 100%;
  top:0px;
  left:0px;
  display:flex;
  justify-content: space-around;
  align-items: center
`;

const ModalInner = styled.div`
  width: 80%;
  width: 60%;
  background-color: white;
  box-sizing : border-box;
  padding:20px;
`

class Modal extends Component {
  static defaultProps = {
    visible: false
  }

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    visible: PropTypes.boolean
  };

  constructor(props) {
    super(props);
  }

  render() {

    if(!this.props.visible){
      return ''
    }

    return (
      <ModalOuter onClick={this.props.onClose}>
        <ModalInner>
          {this.props.children}
        </ModalInner>
      </ModalOuter>
    );
  }
}

export default Modal;
