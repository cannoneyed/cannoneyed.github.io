import React from 'react';
import { Link } from 'react-router';
import { prefixLink } from 'gatsby-helpers'; // eslint-disable-line
import { getProjects } from '../../utils/projects-helpers';

import styles from './styles.module.scss';

const generateProjects = ({ route }) => {
  const rows = [];
  getProjects(route).forEach(({ data, path }) => {
    const { title, thumbnail } = data;
    rows.push(
      <div
        key={ path }
        className={ styles.cell }
      >
        <Link to={ prefixLink(path) }>
          <img
            className={ styles.responsiveImage }
            src={ `${path}/${thumbnail}` }
            alt={ title }
          />
        </Link>
        <div className={ styles.projectTitle }>
          {title}
        </div>
      </div>
    );
  });
  return rows;
};

export default function Projects(props) {
  const items = generateProjects(props);
  return (
    <div className={ styles.container }>
      <div className={ styles.grid }>
        { items }
      </div>
    </div>
  );
}

Projects.propTypes = {
  posts: React.PropTypes.object
};
