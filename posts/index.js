import React, { PropTypes } from 'react';

import '../src/css/lists.css';

export default function SiteIndex() {
  return (
    <section>
      <p>
        <h2>andy coenen</h2>
      </p>
      {/* <img alt="profile" src={ image } className={ styles.profileImage } /> */}
      <p>
        technologist working and living in San Francisco. I am passionate about
        building tools that let us turn imagination into reality.{' '}
      </p>
      <p>
        currently working as a software engineer at{' '}
        <a
          href="https://research.google.com/teams/brain/healthcare/"
          target="_blank"
        >
          Google Brain
        </a>
      </p>
    </section>
  );
}

SiteIndex.propTypes = {
  route: PropTypes.object
};
