import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers' // eslint-disable-line

import styles from './styles.module.scss'

const repositories = [{
  title: 'fixer',
  description: 'automatic react component fixture generator',
  href: 'https://github.com/cannoneyed/fixer',
}, {
  title: 'tmm-glare',
  description: "Geolocation-based web app for prerelease of The M Machine's Glare album",
  href: 'https://github.com/cannoneyed/tmm-glare',
}, {
  title: 'holograf',
  description: '3D program flow and algorithm visualizer',
  href: 'https://github.com/cannoneyed/holograf',
}, {
  title: 'OSCillate',
  description: 'Simple OSC plugin (AU / VST)',
  href: 'https://github.com/cannoneyed/OSCillate',
}]


export default function Repositories() {
  return (
    <div className={ styles.container }>
      { repositories.map(repo => (
        <div>
          <Link to={ repo.href }>
            { repo.title }
          </Link>
        </div>
      )) }
    </div>
  )
}
