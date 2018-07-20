import React, { Component } from 'react';
import Option from './Option';

export default class ChapterSelect extends Component {
  constructor(props) {
    super(props);
    this.changeOption = this.changeOption.bind(this);
    this.getOptions = this.getOptions.bind(this);
  }

  getOptions(chapters, book) {
    return chapters
      .map((item) => <Option key={book + item.chapter} value={item.chapter} name={"Chapter " + item.chapter} />);
  }

  changeOption(e) {
    const { onRequest, selected } = this.props;
    const bookName = selected;
    const chapterNumber = e.target.value;

    if (chapterNumber) {
      onRequest(bookName, chapterNumber);
    }
  }

  render() {
    const { className, chapters, selected } = this.props;

    if (!chapters) {
      return null;
    }

    const { changeOption, getOptions } = this;

    return (
      <div className={className} onChange={changeOption}>
        <label>Chapter:</label>
        <select>
          <option>select...</option>
          { getOptions(chapters, selected) }
        </select>
      </div>
    );
  }
}
