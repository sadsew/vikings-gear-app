import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AllGearList from '../../components/AllGearList';

class AllGearPage extends Component {
  render() {
    const { lang } = this.props;
    return <AllGearList lang={lang} />
  }
}

AllGearPage.propTypes = {
  lang: PropTypes.string.isRequired
}

export const mapStateToProps = state => {
  return {
    lang: state.lang
  };
};

export default connect(
  mapStateToProps
)(AllGearPage);
