import React from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal'
import {LayersConsumer} from '../contexts/LayersProvider'

function AboutModal({...props}) {
  return (
    <LayersConsumer>
      {context => (
        <Modal
          visible ={context.aboutModalVisible}
          onClose ={context.closeAboutModal}
        >
          <div>
            <h1>What is this?</h1>
            <h1>Where are the maps from?</h1>
            <h1>Why did you make this</h1>
            <h1>Can I make my own maps?</h1>
            <h1>Is the code for this site open?</h1>
          </div>
        </Modal>
      )}
    </LayersConsumer>
  );
}

AboutModal.defaultProps = {};

AboutModal.propTypes = {};

export default AboutModal;
