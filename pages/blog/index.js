import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import Archive from '../../src/components/Archive';

export default function BlogIndex({ route }) {
  return (
    <section className="content">
      <Helmet title="blog" />
      <header>
        <h2>blog</h2>
      </header>
      <Archive route={route} />
    </section>
  );
}

BlogIndex.propTypes = {
  route: PropTypes.object
};
