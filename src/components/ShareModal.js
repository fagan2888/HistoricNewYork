import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {LayersConsumer} from '../contexts/LayersProvider';
import styled from 'styled-components';
import Modal from './Modal';
import * as BrandIcons from '@fortawesome/free-brands-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  FacebookShareButton,
  TwitterShareButton,
  TumblrShareButton,
  FacebookIcon,
  TwitterIcon,
  TumblrIcon,
} from 'react-share';

const SharePane = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
`;

class ShareModal extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <LayersConsumer>
        {context => {
          //context.getShortURL().then(url => {
            return (
              <Modal
                onClose={context.closeShareModal}
                visible={context.shareModalVisible}>
                <SharePane>
                  <FacebookShareButton
                    url={context.encodeShareStateToHash()}
                    quote={'Check out this map of historic New York'}>
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                  <TwitterShareButton
                    url={context.encodeShareStateToHash()}
                    title={'Check out this Historic map mashup for NYC'}>
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>
                  <TumblrShareButton
                    url={context.encodeShareStateToHash()}
                    title={'Historic New York Map'}
                    caption={'Check out this historic map of NYC'}>
                    <TumblrIcon size={32} round />
                  </TumblrShareButton>
                  <p>Facebook</p>
                  <p>Twitter</p>
                  <p>Tumblr</p>
                  <input
                    style={{gridColumn: '1 / 4'}}
                    type="text"
                    value={context.encodeShareStateToHash()}
                  />
                </SharePane>
              </Modal>
            );
          //});
        }}
      </LayersConsumer>
    );
  }
}

export default ShareModal;
