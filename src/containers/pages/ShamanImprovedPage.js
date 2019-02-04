import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import GearList from '../../components/shamanImproved/GearList';
import gearSet from '../../data/gearLists/gear-shaman-imp';

class ShamanPage extends Component {
  render() {
    const type = this.props.match.params.gearType;
    const lang = this.props.lang;
    return (
      <GearList
        type={type}
        set={gearSet}
        lang={lang}
      />
    );
  }
}

ShamanPage.propTypes = {
  lang: PropTypes.string.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      gearType: PropTypes.string
    })
  }).isRequired
}

export const mapStateToProps = state => {
  return {
    lang: state.lang
  };
};

export default connect(
  mapStateToProps
)(ShamanPage);
