import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { filter } from 'lodash';

import '../styles/GearPartSwitcher.css';

class GearPartSwitcher extends Component {
  switchingList(parts) {
    const array = [];
    for (let key in parts) {
      array.push(parts[key]);
    }
    return array;
  }
  doneClass(part, state, type) {
    const partsCount = [];
    const selected = [];

    for (let key in part.parts) {
      if(filter(state[type], { primary: key, secondary: 'all', material: 'all'}).length !== 0) {
        selected.push('pom')
      }
      partsCount.push(key);
    }

    if (selected.length === partsCount.length) return 'switcher-item-checked';
    return 'switcher-item-unchecked'
  }
  checkedClass(part, state) {
    if(part.pos === state.position) {
      return 'switcher-item-active';
    }
    return 'switcher-item-inactive';
  }
  render() {
    const { switching, parts, state, type, lang } = this.props;
    return(
      <div className="switcher-list">
        {this.switchingList(parts[type].gear).map(part => {
          return (
            <div
              key={part.id} 
              onClick={() => switching(part.pos)}
              className={`switcher-item ${this.doneClass(part, state, type)} ${this.checkedClass(part, state)}`}
            >
              <img src={`../images/${part.img}.png`} alt={part.name[lang]} />
              <p>{part.name[lang]}</p>
            </div>
          )
        })}
      </div>
    )
  }
}

GearPartSwitcher.propTypes = {
  lang: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  state: PropTypes.shape({}).isRequired,
  parts: PropTypes.shape({}).isRequired,
  switching: PropTypes.func.isRequired
}

export default GearPartSwitcher;
