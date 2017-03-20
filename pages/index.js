import { config } from 'config'; // eslint-disable-line
import React, { PropTypes } from 'react'

import '../src/css/lists.css'

import image from '../images/andy-gray.jpg'
import styles from './styles.module.scss'

export default function SiteIndex() {
  return (
    <section>
      <p>
        <h2>andy coenen</h2>
      </p>
      {/* <img alt="profile" src={ image } className={ styles.profileImage } /> */}
      <p>
        programmer, inventor, artist and musician working and living in San Francisco
      </p>
      <p>
        currently working as a web engineer at <a href="https://www.patreon.com" target="_blank" >Patreon</a>
      </p>
    </section>
  )
}

SiteIndex.propTypes = {
  route: PropTypes.object,
}
