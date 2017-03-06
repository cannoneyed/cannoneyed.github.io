import React, { Component, PropTypes } from 'react';

export default class Anchor extends Component {
  static propTypes = {
    href: PropTypes.string,
    title: PropTypes.string,
  };

  render() {
    return (
      <a target="_blank" rel="noopener noreferrer" href={props.href}>
        {props.title}
      </a>
    );
  }
}
