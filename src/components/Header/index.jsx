import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'; // eslint-disable-line
import { config } from 'config'; // eslint-disable-line

export default function Header() {
  return (
    <header className='header'>
      <nav>
        <ul>
          <li>
            <Link to={ prefixLink('/') }>
              cannoneyed
            </Link>
          </li>
          &middot;
          <li>
            <Link to={ prefixLink('/about/') }>
              about
            </Link>
          </li>
          &middot;
          <li>
            <Link to={ prefixLink('/blog/') }>
              blog
            </Link>
          </li>
          &middot;
          <li>
            <Link to={ prefixLink('/projects/') }>
              projects
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

Header.propTypes = {
  className: PropTypes.string
}
