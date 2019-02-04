import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import content from '../data/content';
import { updateLang } from '../action/lang';

import './styles/Header.css';

class Header extends Component {
  render() {
    const { lang } = this.props;
    return(
      <div className="header">
        <div className="header-main">
          <div className="left-header">
            <h2><Link to="/">{content.header.leftMessage[lang]}</Link></h2>
          </div>
          <div className="right-header">
            <button
              className={`lang-button ${lang === 'ru' ? 'checked' : false}`}
              onClick={() => this.props.updateLang('ru')}
            >
              RU
            </button>
            <button
              className={`lang-button ${lang === 'en' ? 'checked' : false}`}
              onClick={() => this.props.updateLang('en')}
            >
              EN
            </button>
          </div>
        </div>
        <div className="header-buttons">
          <Link to="/comments">
            <div className="msgBox">{content.comments.button[lang]}</div>
          </Link>
          <Link to="/allgear">
            <div className="msgBox msgBox-blue-bg">{content.buttons.allGear[lang]}</div>
          </Link>
        </div>
        {/* <div className="annoceBox">
          {content.annonceMsg[lang]}
        </div> */}
      </div>
    )
  }
}

Header.propTypes = {
  lang: PropTypes.string.isRequired,
  updateLang: PropTypes.func.isRequired
}

export const mapStateToProps = state => {
  return {
    lang: state.lang
  };
};

export const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateLang,
      changePage: (route, params) => push(route, params)
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
