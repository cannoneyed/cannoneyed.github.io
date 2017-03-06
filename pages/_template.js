import React, { PropTypes } from 'react'
import Header from '../src/components/Header'
import Footer from '../src/components/Footer'
import '../src/css/page.css'

import styles from './styles.module.scss'

export default function Template({ children }) {
  return (
    <div className={ styles.mainContainer }>
      <main className={ styles.mainColumn }>
        <Header />
        {children}
        <Footer />
      </main>
    </div>
  )
}

Template.propTypes = {
  children: PropTypes.any
}
