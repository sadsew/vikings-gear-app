import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { filter, uniqBy, sortBy } from 'lodash';

import { loadStateFromLS } from '../utils/localStorage';

import SavedSets from './SavedSets';

import content from '../data/content';
import specialSets from '../data/gearLists/gear-spec-new';
import shamanSets from '../data/gearLists/gear-shaman-new';
import shamanImpSets from '../data/gearLists/gear-shaman-imp';
import allinvaders from '../data/invaders';

import createInvadersListSpec from './../utils/invList-cpec';
import createInvadersListShaman from './../utils/invList-shaman';
import createInvadersListShamanImp from './../utils/invList-shaman-imp';

import './styles/AllInvadersList.css';


function allStorageItems() {
  let newArrInvaders = [];
  let newArrUbers = [];
  let newArrMat = [];
  let newArrInvMat = [];

  for (let key in specialSets) {
    const itemLS = loadStateFromLS(`${key}`);
    const {unicInvList, unicUbersList, unicMatList, invaderMaterialslList} = createInvadersListSpec(specialSets[key].gear, itemLS)
    if(itemLS !== null) {
      if (itemLS.length !== 0) {
        newArrInvaders = newArrInvaders.concat(unicInvList);
        newArrUbers = newArrUbers.concat(unicUbersList);
        newArrMat = newArrMat.concat(unicMatList);
        newArrInvMat = newArrInvMat.concat(invaderMaterialslList);
      }
    }
  }
  for (let key in shamanSets) {
    const itemLS = loadStateFromLS(`shaman_${key}`);
    const {unicInvList, unicUbersList, unicMatList, invaderMaterialslList} = createInvadersListShaman(shamanSets[key].gear, itemLS)
    if(itemLS !== null) {
      if (itemLS.length !== 0) {
        newArrInvaders = newArrInvaders.concat(unicInvList);
        newArrUbers = newArrUbers.concat(unicUbersList);
        newArrMat = newArrMat.concat(unicMatList);
        newArrInvMat = newArrInvMat.concat(invaderMaterialslList);
      }
    }
  }
  for (let key in shamanImpSets) {
    const itemLS = loadStateFromLS(`shaman_imp_${key}`);
    const {unicInvList, unicUbersList, unicMatList, invaderMaterialslList} = createInvadersListShamanImp(shamanImpSets[key].gear, itemLS)
    if(itemLS !== null) {
      if (itemLS.length !== 0) {
        newArrInvaders = newArrInvaders.concat(unicInvList);
        newArrUbers = newArrUbers.concat(unicUbersList);
        newArrMat = newArrMat.concat(unicMatList);
        newArrInvMat = newArrInvMat.concat(invaderMaterialslList);
      }
    }
  }
  return {
    invaders: sortBy(uniqBy(newArrInvaders), 'name.ru'),
    ubers: sortBy(uniqBy(newArrUbers), 'name.ru'),
    usualMaterials: sortBy(uniqBy(newArrMat), 'name.ru'),
    invadersMaterials: newArrInvMat
  }
}

function sortedInvadersList(type) {
  const listOfItems = [];
  const {invadersMaterials} = allStorageItems();
  let sortedItem = null;
  for(var item = 0; item < allinvaders.length; item++) {
    if(allinvaders[item].type === type) {
      sortedItem = {
        invader: allinvaders[item],
        fullListMats: filter(invadersMaterials, { [type]: allinvaders[item] }),
        uniqListMats: sortBy(uniqBy(filter(invadersMaterials, { [type]: allinvaders[item] })), 'name.ru')
      }
      if(sortedItem && sortedItem.fullListMats.length !== 0) {
        listOfItems.push(sortedItem);
      }
    }
  }
  return listOfItems;
}

function renderInvadersList(list, lang) {
  if (list.length === 0) {
    return (
      <div className="all-invaders-list-empty">{content.others.savedSets.noneInv[lang]}</div>
    )
  }
  return (
    <div className="all-invaders-list">
      {list.map(item => (
        <div key={item.invader.id} className="all-invaders-list__item">
          <img
            className="all-invaders-list__item-img"
            src={`../images/invaders/${item.invader.img}`}
            alt={`${item.invader.name[lang]}`}
          />
          <span className="all-invaders-list__item-description">{item.invader.name[lang]}</span>
          <div className="all-invaders-list__item-matlist">
            {item.uniqListMats.map(mat => (
              <div key={mat.id}  className="all-invaders-list__item-matlist__material">
                <img
                  className="all-invaders-list__item-matlist-img"
                  src={`../images/${mat.img}.png`}
                  alt={`${mat.name[lang]}`}
                />
                {mat.name[lang]}
                <span className="all-invaders-list__item-matlist-count">{filter(item.fullListMats, {id: mat.id}).length}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

class AllInvadersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeList: 'invaders'
    };
  }

  listSwitcherHandler(type) {
    this.setState({
      activeList: type
    })
  }

  render() {
    const { lang } = this.props;
    const invadersMaterialsList = sortedInvadersList('invader');
    const ubersMaterialsList = sortedInvadersList('uber');
    return (
      <div>
        <SavedSets lang={lang} />
        <div className="all-invaders-buttons">
          <button
            className={`button button-left ${this.state.activeList === 'invaders' ? 'active' : false}`}
            onClick={() => this.listSwitcherHandler('invaders')}
          >
            Invaders
          </button>
          <button
            className={`button button-right ${this.state.activeList === 'ubers' ? 'active' : false}`}
            onClick={() => this.listSwitcherHandler('ubers')}
          >
            Ubers
          </button>
        </div>
        {
          this.state.activeList === 'invaders' ?
          renderInvadersList(invadersMaterialsList, lang) :
          renderInvadersList(ubersMaterialsList, lang)
        }
      </div>
    )
  }
}

AllInvadersList.propTypes = {
  lang: PropTypes.string.isRequired
}

export default AllInvadersList;
