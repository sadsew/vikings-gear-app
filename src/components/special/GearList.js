import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { filter, reject } from 'lodash';
import { Divider } from 'antd';
import { Link } from 'react-router-dom';

import { saveStateToLS, loadStateFromLS } from '../../utils/localStorage';

import InvadersList from './InvadersList';
import GearPartSwitcher from './GearPartSwitcher';
import PrimaryPartList from './PrimaryPartList';

import content from '../../data/content';
import '../styles/GearList.css';

class GearList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 'head',
      [props.type]: loadStateFromLS(this.props.type) || []
    };
  }

  primaryPartClickHandler(partID, count) {
    const items = this.state[this.props.type];
    let item = {
      primary: partID[0],
      secondary: partID[1] || 'all',
      material: partID[2] || 'all'
    };

    const isPrimary = item.secondary === 'all';
    const isSecondary = item.secondary !== 'all' && item.material === 'all';
    const isMaterial = item.material !== 'all';

    if (isPrimary) {
      let rejected;
      if (filter(items, { primary: item.primary }).length !== 0) {
        if (filter(items, { primary: item.primary, secondary: 'all' }).length !== 0) {
          rejected = reject(items, { primary: item.primary });
          saveStateToLS([this.props.type], rejected);
          return this.setState({
            [this.props.type]: rejected
          })
        }
        rejected = reject(items, { primary: item.primary });
        rejected.push(item)
        saveStateToLS([this.props.type], rejected);
        return this.setState({
          [this.props.type]: rejected
        })
      }
      items.push(item);
      saveStateToLS([this.props.type], items);
      return this.setState({
        [this.props.type]: items
      })
    }

    if (isSecondary) {
      let rejected;
      if (filter(items, { primary: item.primary, secondary: 'all', material: 'all' }).length !== 0) {
        rejected = reject(items, { primary: item.primary, secondary: 'all', material: 'all' });
        rejected.push(item);
        saveStateToLS([this.props.type], rejected);
        return this.setState({
          [this.props.type]: rejected
        })
      }
      if (filter(items, { primary: item.primary, secondary: item.secondary, material: 'all' }).length !== 0) {
        rejected = reject(items, { primary: item.primary, secondary: item.secondary, material: 'all' });
        saveStateToLS([this.props.type], rejected);
        return this.setState({
          [this.props.type]: rejected
        })
      }
      if (filter(items, { primary: item.primary, material: "all" }).length === count - 1) {
        rejected = reject(items, { primary: item.primary });
        rejected.push({ primary: item.primary, secondary: 'all', material: 'all' });
        saveStateToLS([this.props.type], rejected);
        return this.setState({
          [this.props.type]: rejected
        })
      }
      rejected = reject(items, { primary: item.primary, secondary: item.secondary });
      rejected.push(item);
      saveStateToLS([this.props.type], rejected);
      return this.setState({
        [this.props.type]: rejected
      })
    }

    if (isMaterial) {
      let rejected;
      if (filter(items, { primary: item.primary, secondary: 'all', material: 'all' }).length !== 0) {
        rejected = reject(items, { primary: item.primary });
        rejected.push(item);
        saveStateToLS([this.props.type], rejected);
        return this.setState({
          [this.props.type]: rejected
        })
      }
      if (filter(items, { primary: item.primary, secondary: item.secondary, material: 'all' }).length !== 0) {
        rejected = reject(items, { primary: item.primary, secondary: item.secondary, material: 'all' });
        rejected.push(item);
        saveStateToLS([this.props.type], rejected);
        return this.setState({
          [this.props.type]: rejected
        })
      }
      if (filter(items, { primary: item.primary, secondary: item.secondary, material: item.material }).length !== 0) {
        rejected = reject(items, { primary: item.primary, secondary: item.secondary, material: item.material });
        saveStateToLS([this.props.type], rejected);
        return this.setState({
          [this.props.type]: rejected
        })
      }
      if (filter(items, { primary: item.primary, secondary: item.secondary }).length === count - 1) {
        rejected = reject(items, { primary: item.primary, secondary: item.secondary });
        rejected.push({ primary: item.primary, secondary: item.secondary, material: 'all' });
        saveStateToLS([this.props.type], rejected);
        return this.setState({
          [this.props.type]: rejected
        })
      }

      items.push(item);
      saveStateToLS([this.props.type], items);
      return this.setState({
        [this.props.type]: items
      })
    }
  }
  primaryStyleClass (key) {
    if (filter(this.state[this.props.type], { primary: key[0], secondary: 'all', material: 'all'}).length !== 0) {
      return 'item-checked'
    }
    return 'item-unchecked';
  }
  secondaryStyleClass (key) {
    if (filter(this.state[this.props.type], { primary: key[0], secondary: 'all', material: 'all'}).length !== 0) {
      return 'item-checked'
    }
    if (filter(this.state[this.props.type], { primary: key[0], secondary: key[1], material: 'all'}).length !== 0) {
      return 'item-checked'
    }
    return 'item-unchecked';
  }
  materialStyleClass (key) {
    if (filter(this.state[this.props.type], { primary: key[0], secondary: 'all', material: 'all'}).length !== 0) {
      return 'item-checked'
    }
    if (filter(this.state[this.props.type], { primary: key[0], secondary: key[1], material: 'all'}).length !== 0) {
      return 'item-checked'
    }
    if (filter(this.state[this.props.type], { primary: key[0], secondary: key[1], material: key[2]}).length !== 0) {
      return 'item-checked'
    }
    return 'item-unchecked';
  }
  switcherHandler(position) {
    this.setState({
      position
    })
  }

  render() {
    const { set, type, lang } = this.props;
    const actions = {
      primaryPartClickHandler: (partID, count) =>
        this.primaryPartClickHandler(partID, count),
        primaryStyleClass: (part, state) =>
        this.primaryStyleClass(part, state),
        secondaryStyleClass: (part, state) =>
        this.secondaryStyleClass(part, state),
        materialStyleClass: (part, state) =>
        this.materialStyleClass(part, state),
        switcherHandler: (position) =>
        this.switcherHandler(position),
    }

    return (
      <div className="gear-list">
        <Link to="/" className="back_button">{content.others.backButton[lang]}</Link>
        <Divider>{content.gearPage.titles[type][lang]}</Divider>
        <InvadersList
          gear={set}
          lang={lang}
          type={type}
          state={this.state}
        />
        <GearPartSwitcher
          parts={set}
          type={type}
          switching={actions.switcherHandler}
          state={this.state}
          lang={lang}
        />
        <div className="primary-part">
          <PrimaryPartList
            items={set[this.state.position].parts}
            actions={actions}
            state={this.state}
            lang={lang}
          />
        </div>
      </div>
    );
  }
}

GearList.propTypes = {
  lang: PropTypes.string.isRequired,
  set: PropTypes.shape({}).isRequired,
  type: PropTypes.string.isRequired
}

export default GearList;
