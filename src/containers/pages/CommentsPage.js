import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Disqus from 'disqus-react';
import { Link } from 'react-router-dom';

import content from '../../data/content';


class CommentsPage extends Component {
  render() {
    const { lang } = this.props;
    const disqusShortname = 'vikings-gear';
    const disqusConfig = {
        url: 'https://gear.zak.su/comments',
        identifier: 0,
        title: 'Vikings Gear Helper',
    };
    return (
    <div>
      <div>
        <Link to="/" className="back_button">{content.others.backButton[lang]}</Link>
        <p style={{marginTop: '30px', textAlign: 'center', color: '#fff', fontSize: '1.2em'}}>
          {content.comments.page[lang]}
        </p>
      </div>
      <Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </div>
    );
  }
}

CommentsPage.propTypes = {
  lang: PropTypes.string.isRequired
}

export const mapStateToProps = state => {
  return {
    lang: state.lang
  };
};

export default connect(
  mapStateToProps
)(CommentsPage);
