import { config } from 'config'; // eslint-disable-line
import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import Projects from '../../src/components/Projects';

export default function BlogIndex({ route }) {
  return (
    <section className='content'>
      <Helmet title='projects' />
      <header>
        <h2>selected projects</h2>
      </header>
      <Projects route={route} />
    </section>
  );
}

BlogIndex.propTypes = {
  route: PropTypes.object,
};
