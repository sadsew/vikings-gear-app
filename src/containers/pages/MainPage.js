import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AllInvadersList from '../../components/AllInvadersList';

class MainPage extends Component {
  render() {
    const { lang } = this.props;
    return <AllInvadersList lang={lang} />
  }
}

MainPage.propTypes = {
  lang: PropTypes.string.isRequired
}

export const mapStateToProps = state => {
  return {
    lang: state.lang
  };
};

export default connect(
  mapStateToProps
)(MainPage);
