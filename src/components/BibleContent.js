import React, { Component } from 'react';
import Verse from './Verse';
import Loader from './Loader';

export default class BibleContent extends Component {
  getVerses(verses) {
    return verses
      .map(({text, number}, index) => {
        return <Verse key={index} number={number} text={text} />;
      });
  }

  render() {
    const { dataResult, className, loading } = this.props;

    if (!dataResult) {
      return loading && <Loader /> || null;
    }

    const { bookName, chapterNumber, verses } = dataResult;

    return (
      <div className={className}>
        <h2><span className="selected-book">{ bookName }</span> <span className="selected-chapter">Chapter { chapterNumber }</span></h2>
        <div className="verses">
          {this.getVerses(verses)}
        </div>
      </div>
    );
  }
}
