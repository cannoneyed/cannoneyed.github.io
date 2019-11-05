import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';

import Projects from '../../src/components/Projects';
import Repositories from '../../src/components/Repositories';

export default function BlogIndex({ route }) {
  return (
    <section className="content">
      <Helmet title="projects" />
      <header>
        <h2>selected projects</h2>
      </header>
      <Projects route={route} />
      <header>
        <h2>selected repositories</h2>
      </header>
      <Repositories />
    </section>
  );
}

BlogIndex.propTypes = {
  route: PropTypes.object
};
