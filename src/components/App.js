import React, { Component } from 'react';
import { fetchChapter } from '../api/biblenet.api.js';
import books from '../data/bible.books.info.obj.js';
import BrowseOptions from './BrowseOptions';
import BibleContent from './BibleContent';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: '',
      dataResult: null,
      loading: false
    };

    this.onSelect = this.onSelect.bind(this);
    this.onRequest  = this.onRequest.bind(this);
    this.mapVerses = this.mapVerses.bind(this);
    this.setResults = this.setResults.bind(this);
  }

  onSelect(bookSelected) {
    if (!bookSelected) {
      return;
    }

    this.setState({
      selected: bookSelected
    });
  }

  mapVerses(versesData) {
    return Object.keys(versesData)
      .map((verseKey) => {
        return {
          number: verseKey,
          text: versesData[verseKey].verse
        };
      });
  }

  setResults(data) {
    this.setState({
      dataResult: data
    });
  }

  onRequest(bookName, chapterNumber) {
    this.setState({
      loading: true,
      dataResult: null
    });

    fetchChapter(bookName, chapterNumber)
      .then((data) => {
        this.setState({
          loading: false,
          dataResult: {
            verses: this.mapVerses(data.chapter),
            bookName: data.book_name,
            chapterNumber: data.chapter_nr
          }
        });
      })
      .catch(() => {
        this.setState({
          loading: false,
          dataResult: null
        });
      });
  }

  render() {
    const { selected, dataResult, loading } = this.state;
    const { onSelect,  onRequest } = this;

    return (
      <React.Fragment>
        <header>
          <h1>React Bible App</h1>
          <BrowseOptions
            selected={selected}
            onSelect={onSelect}
            onRequest={onRequest}
            books={books}
            className="browse-options"
          />
        </header>

        <BibleContent
          className="results"
          dataResult={dataResult}
          loading={loading}
        />
      </React.Fragment>
    );
  }
}

export default App;
