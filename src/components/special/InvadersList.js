import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { filter, uniqBy, sortBy } from 'lodash';

import '../styles/InvadersList.css';
import content from '../../data/content';

class InvadersList extends Component {
  createFullInvadersList(gear, state) {
    const gearList = [];
    const invadersList = [];
    const ubersList = [];
    const usualMatList = [];

    for (let a in gear) {
      for (let b in gear[a].parts) {
        for (let c in gear[a].parts[b].subparts) {
          let invader = gear[a].parts[b].subparts[c].invader
          if (!invader) {
            const invadersArr = [];
            const uberArr = [];
            for (let d in gear[a].parts[b].subparts[c].materials) {
              invadersArr.push(gear[a].parts[b].subparts[c].materials[d].invader);
              uberArr.push(gear[a].parts[b].subparts[c].materials[d].uber);
              if (gear[a].parts[b].subparts[c].materials[d].invader) {
                gearList.push({
                  primary: b,
                  secondary: c,
                  invader: gear[a].parts[b].subparts[c].materials[d].invader,
                  uber: gear[a].parts[b].subparts[c].materials[d].uber,
                  material: d
                });
              }
              if (!gear[a].parts[b].subparts[c].materials[d].invader) {
                usualMatList.push({
                  primary: b,
                  secondary: c,
                  usualMat: gear[a].parts[b].subparts[c].materials[d],
                  material: d
                });
              }
            }
          }
          gearList.push({
            primary: b,
            secondary: c,
            invader: gear[a].parts[b].subparts[c].invader,
            uber: gear[a].parts[b].subparts[c].uber,
            material: c
          });
        }
      }
    }

    gearList.map((item) => {
      if (!item.invader) return false;
      if (filter(state, { primary: item.primary, secondary: 'all' }).length !== 0) return false;
      if (filter(state, { primary: item.primary, secondary: item.secondary, material: 'all' }).length !== 0) return false;
      if (filter(state, { primary: item.primary, secondary: item.secondary, material: item.material }).length !== 0) return false;
      invadersList.push(item.invader);
      ubersList.push(item.uber);
    })

    const usualList = [];

    usualMatList.map(item => {
      if (item.invader) return false;
      if (filter(state, { primary: 'all', secondary: 'all', material: 'all'}).length !== 0) return false;
      if (filter(state, { primary: item.primary, secondary: 'all', material: 'all'}).length !== 0) return false;
      if (filter(state, { primary: item.primary, secondary: item.secondary, material: 'all'}).length !== 0) return false;
      if (filter(state, { primary: item.primary, secondary: item.secondary, material: item.material}).length !== 0) return false;
      usualList.push(item.usualMat);
    });
    
    const unicInvList = sortBy(uniqBy(invadersList), 'name.ru');
    const unicUbersList = sortBy(uniqBy(ubersList), 'name.ru');
    const unicMatList = sortBy(uniqBy(usualList), 'name.ru');

    const isInvListDone = unicInvList.length === 0;
    const isMatListDone = unicMatList.length === 0;

    return (
      <div>
        <h2>{content.others.invadersList.title[this.props.lang]}</h2>
        {!isInvListDone ? unicInvList.map(item => {
          return (
            <div key={item.id} className="invaders-list-item">
              <img
                className="invaders-list-img"
                src={`../images/invaders/${item.img}`}
                alt={`${item.name[this.props.lang]}`}
              />
              {item.name[this.props.lang]}
            </div>
          )
        }) : <div>Done!</div>}
        {!isInvListDone ? unicUbersList.map(item => {
          return (
            <div key={item.id} className="invaders-list-item">
              <img
                className="invaders-list-img"
                src={`../images/invaders/${item.img}`}
                alt={`${item.name[this.props.lang]}`}
              />
              {item.name[this.props.lang]}
            </div>
          )
        }) : false}
        <h2>{content.others.usualList.title[this.props.lang]}</h2>
        {!isMatListDone ? unicMatList.map(item => {
          return (
            <div key={item.id} className="invaders-list-item">
              <img
                className="invaders-list-img"
                src={`../images/${item.img}.png`}
                alt={`${item.name[this.props.lang]}`}
              />
              {item.name[this.props.lang]} x<span>{filter(usualList, { id: item.id }).length}</span>
            </div>
          )
          }) : <div>Done!</div>}
      </div>
    )
  }
  
  render() {
    const { gear, state, type} = this.props;
    return(
      <div className="invaders-list">
        {this.createFullInvadersList(gear, state[type])}
      </div>
    )
  }
}

InvadersList.propTypes = {
  lang: PropTypes.string.isRequired,
  gear: PropTypes.shape({}).isRequired,
  state: PropTypes.shape({}).isRequired,
  type: PropTypes.string.isRequired
}

export default InvadersList;
