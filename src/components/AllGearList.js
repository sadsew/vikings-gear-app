import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Divider } from 'antd';

import content from '../data/content';
import './styles/AllGearList.css';

function createMenuList(items, lang, url, isNew = true) {
  const list = [];
  if (isNew) {
    for (let key in items) {
      if ('old_' !== key.substr(0, 4)) {
        list.push(
          <Link key={key} to={`/${url}/${key}`}>
            <img alt={items[key][lang]} src={`/images/${items[key].img}.png`} />
            <p>{items[key][lang]}</p>
            <div className="newGear">NEW</div>
          </Link>
        )
      }
    }
  } else {
    for (let key in items) {
      if ('old_' === key.substr(0, 4)) {
        list.push(
          <Link key={key} to={`/${url}/${key}`}>
            <img alt={items[key][lang]} src={`/images/${items[key].img}.png`} />
            <p>{items[key][lang]}</p>
          </Link>
        )
      }
    }
  }
  return list;
}

class AllGearList extends Component {
  render() {
    const { lang } = this.props;
    return(
      <div>
        <Divider>{content.mainPage.specGearTitle[lang]}</Divider>
        <div className="new-gear-menu-block">
          {createMenuList(content.gearPage.titles, lang, 'gear')}
        </div>
        <Divider>{content.mainPage.impShamanGearTitle[lang]}</Divider>
        <div className="new-gear-menu-block-shaman">
          {createMenuList(content.shamanImproved, lang, 'shaman_improved')}
        </div>
        <Divider>{content.mainPage.oldSpecGearTitle[lang]}</Divider>
        <div className="new-gear-menu-block">
          {createMenuList(content.gearPage.titles, lang, 'gear', false)}
        </div>
        <Divider>{content.mainPage.shamanGearTitle[lang]}</Divider>
        <div className="new-gear-menu-block-shaman">
          {createMenuList(content.shamanPage.titles, lang, 'shaman', false)}
        </div>
      </div>
    )
  }
}

AllGearList.propTypes = {
  lang: PropTypes.string.isRequired
}

export default AllGearList;
