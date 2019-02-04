import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import newSpecGear from '../../data/gearLists/gear-spec-new';
import GearList from '../../components/special/GearList';

class GearPage extends Component {
  render() {
    const type = this.props.match.params.gearType;
    const lang = this.props.lang;
    const gearSet = newSpecGear[type].gear;
    return (
      <GearList
        type={type}
        set={gearSet}
        lang={lang}
      />
    );
  }
}

GearPage.propTypes = {
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
)(GearPage);
