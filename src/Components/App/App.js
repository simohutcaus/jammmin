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
      playlistName: "New Playlist",
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

  removeTrack(trackRemove) {
    console.log(trackRemove + ' this is trackRemove');
    let newtracks = [] 
    this.state.playlistTracks.filter(playlistTrack => {
     if (playlistTrack.id !== trackRemove.id) {
       newtracks.push(playlistTrack);
     }
  })
  console.log(newtracks + ' this is new tracks')
  this.setState({playlistTracks: newtracks});
  }




  updatePlaylistName(name) {
    this.setState({playlistName: name})
  }

  savePlaylist() {
    let plyname = this.state.playlistName;
    console.log(this.state.playlistTracks);
    let trackURIs = [];
    this.state.playlistTracks.forEach(playlistTrack => {
    trackURIs.push('spotify:track:' + playlistTrack.id);
    console.log(trackURIs + ' this is trackURIs');
    })
    Spotify.savePlaylist(plyname, trackURIs);
    this.setState({playlistName: "New Playlist", searchResults:[], playlistTracks: []})
  }

search(search) {  
    if(!search) {
      console.log('null');
      return;
    }
    console.log(search);
    Spotify.search(search).then(tracks => this.setState({searchResults: tracks}));
    console.log(this.state.searchResults);
  }


  render() {
    return (
      <div>
  <div className="App">
  <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <SearchBar onSearch={this.search}/>
    <div className="App-playlist">
    <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}  />
    <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
    </div>
  </div>
</div>
    );
  }
}

export default App;
