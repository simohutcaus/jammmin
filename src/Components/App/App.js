import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../PlayList/Playlist';
import Spotify from '../../util/Spotify';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: "test",
      playlistTracks: []
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    console.log('triggered at app js');
    console.log(track);
    let tracklist = this.state.playlistTracks;
    if (!tracklist.includes(track)) {
      tracklist = tracklist.concat(track);
    }
    this.setState({playlistTracks: tracklist});
  }

  removeTrack(track) {
    this.setState({playlistTracks: this.state.playlistTracks.filter(playlistTrack => {
      playlistTrack.id !== track.id
    })
  })
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name})
  }

  savePlaylist() {
    let trackURIs = [];
    this.state.playlistTracks.forEach(playlistTrack => {
    trackURIs.push(playlistTrack.uri);
    Spotify.savePlaylist("test", trackURIs);
    })
  }

search(search) {  
    console.log(search);
    Spotify.search(search).then(tracks => this.setState({searchResults: tracks}));
    console.log(this.state.searchResults);
  }


  render() {
    return (
      <div>
  <h1>Ja<span className="highlight">mmm</span>ing</h1>
  <div className="App">
      <SearchBar onSearch={this.search}/>
    <div className="App-playlist">
    <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}  />
    <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.onRemove} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
    </div>
  </div>
</div>
    );
  }
}

export default App;
