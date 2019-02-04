import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { loadStateFromLS, saveStateToLS } from '../utils/localStorage';

import './styles/SavedSets.css';

import content from '../data/content';
import specialSets from '../data/gearLists/gear-spec-new';
import shamanSets from '../data/gearLists/gear-shaman-new';
import shamanImpSets from '../data/gearLists/gear-shaman-imp';

function listOfSpecGear(lang) {
  let list = [];
  for (let key in specialSets) {
    const res = loadStateFromLS(key);
    if(res !== null) {
      if (res.length !== 0) {
        list.push(
          <Link
            className="saved-item"
            key={content.gearPage.titles[key].id} 
            to={`/gear/${key}`}
          >
            <img 
              src={`../images/${content.gearPage.titles[key].img}.png`}
              alt={content.gearPage.titles[key][lang]}
            />
            <span className="description">{content.gearPage.titles[key][lang]}</span>
            {key.indexOf('old_') !== -1 ? null : <span className="saved-item-info">NEW</span>}
          </Link>
        )
      }
    }
  }
  return list;
}

function listOfShamanGear(lang) {
  let list = [];
  for (let key in shamanSets) {
    const res = loadStateFromLS(`shaman_${key}`);
    if(res !== null) {
      if (res.length !== 0) {
        if (key.indexOf('imp_') !== -1) return;
        list.push(
          <Link
            className="saved-item"
            key={content.shamanPage.titles[key].id} 
            to={`/shaman/${key}`}
          >
            <img 
              src={`../images/${content.shamanPage.titles[key].img}.png`}
              alt={content.shamanPage.titles[key][lang]}
            />
            <span className="description">{content.shamanPage.titles[key][lang]}</span>
          </Link>
        )
      }
    }
  }
  return list;
}

function listOfShamanImpGear(lang) {
  let list = [];
  for (let key in shamanImpSets) {
    const res = loadStateFromLS(`shaman_imp_${key}`);
    if(res !== null) {
      if (res.length !== 0) {
        list.push(
          <Link
            className="saved-item"
            key={content.shamanImproved[key].id} 
            to={`/shaman_improved/${key}`}
          >
            <img 
              src={`../images/${content.shamanImproved[key].img}.png`}
              alt={content.shamanImproved[key][lang]}
            />
            <span className="description">{content.shamanImproved[key][lang]}</span>
            <span className="saved-item-info">NEW</span>
          </Link>
        );
      }
    }
  }
  return list;
}

class SavedSets extends Component {
  render() {
    const { lang } = this.props;
    const listSpecGear = listOfSpecGear(lang);
    const listShamanGear = listOfShamanGear(lang);
    const listShamanGearImp = listOfShamanImpGear(lang)

    if (listSpecGear.length == 0 && listShamanGear.length == 0 && listShamanGearImp.length == 0) {
      return (
        <div className="saved-sets">
          <h2>{content.others.savedSets.title[lang]}</h2>
          <p className="noneMsg">{content.others.savedSets.noneMsg[lang]}</p>
        </div>
      )
    }
 
    return(
      <div className="saved-sets">
        <h2>{content.others.savedSets.title[lang]}</h2>
        {listSpecGear}
        {listShamanGear}
        {listShamanGearImp}

      </div>
    )
  }
}

SavedSets.propTypes = {
  lang: PropTypes.string.isRequired
}


export default SavedSets;
