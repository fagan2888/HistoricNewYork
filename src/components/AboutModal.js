import React from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';
import {LayersConsumer} from '../contexts/LayersProvider';
import {Heading, MainText} from '../Typeography'

function AboutModal({...props}) {
  return (
    <LayersConsumer>
      {context => (
        <Modal
          visible={context.aboutModalVisible}
          onClose={context.closeAboutModal}>
          <div style={{color:'#3C5E85',height:'30rem', overflowY:'scroll'}}>

            <Heading>What is this?</Heading>
           <p>
              This is a little project that aims to make it easier to explore,
              compose and share, historic maps from <a href="https://digitalcollections.nypl.org/">NYPL's Historic Maps collection</a>
            </p>
            <Heading>Where are the maps from?</Heading>
            <p>
              Once apon a time there was a magical wonderful group of people
              known as the New York Public Lab's team. They created many
              wonderful projects including the <a href="http://spacetime.nypl.org">Space Time Directory</a>
            </p>
            <p>
              The Space Time directory contained many wondrous things among
              which was the <a href="http://maps.nypl.org/warper/">Map Warper</a>  <a href="http://spacetime.nypl.org/maps-by-decade/#/">dataset</a>{' '} of geo-rectified historic maps. These where maps that had been
              painstakingly, carefully overlaid on current maps of New York so
              they lined up. The data for this site comes from there
            </p>
            <Heading>Why did you make this</Heading>
            <p>
              I love historic maps, they are a wondeful way of understanding the
              history of a place. Have used them at a couple of events, I wanted
              a way to more intuitevly browse and share these maps. Also I had
              two months of spare time and needed a project
            </p>
            <Heading>Can I make my own maps?</Heading>
            <p>
              Sure, you can fork the code in the link in the next section and
              make your own. You can use{' '}
              <a href="http://mapwarper.net/">Map Warper</a> to geo-rectify your
              maps
            </p>
            <Heading>Is the code for this site open?</Heading>
            <p>
              Yup it lives here:{' '}
              <a href="https://github.com/stuartlynn/HistoricNewYork">
                https://github.com/stuartlynn/HistoricNewYork
              </a>
            </p>
            <Heading>What if I find a bug?</Heading>
            <p>
              Open a ticket at this{' '}
              <a href="https://github.com/stuartlynn/HistoricNewYork/issues/new">
                link
              </a>{' '}
              and I will try to resolve it.
            </p>
            <Heading>Who are you?</Heading>
            <p>
              Just an interested party. You can follow me on twitter{' '}
              <a href="https://twitter.com/stuart_lynn">@stuart_lynn</a> and see
              other things I have built at{' '}
              <a href="http://stuartlynn.me">http://stuartlynn.me</a>
            </p>
          </div>
        </Modal>
      )}
    </LayersConsumer>
  );
}

AboutModal.defaultProps = {};

AboutModal.propTypes = {};

export default AboutModal;
