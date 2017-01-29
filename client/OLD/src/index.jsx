import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import YTSearch from 'youtube-api-search';

import SearchBar from './components/search_bar'
import VideoList from './components/video_list'
import VideoDetail from './components/video_detail'
import SomeTextBox from './components/SomeTextBox'
import SomeNumberSomewhere from './components/some_number_somewhere'

const API_KEY = 'AIzaSyA9R_BfJUwTKLu7nekUU0m3xwqWaq4KTVE';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = { 
      videos: [],
      selectedVideo: null,
      someNumber: 0
    };

    this.videoSearch('SnowBoarding');
  }

  videoSearch(term) {
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({ 
        videos: videos,
        selectedVideo: videos[0],
        someNumber: 0
      });
    });
  }

  render() {
    const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 100);

    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <SomeNumberSomewhere someNumber={this.state.someNumber} />
        <SomeTextBox someNumber={this.state.someNumber} />
        <VideoList 
          onVideoSelect={selectedVideo => this.setState({selectedVideo}) }
          videos={this.state.videos} />
      </div>
    );
  }
}

/*
 * Take this component's generated HTML and put it on the page (in the DOM)
 */
ReactDOM.render(
  <App />, 
  document.querySelector('.container')
);
