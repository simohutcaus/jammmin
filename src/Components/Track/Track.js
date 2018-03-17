import React from 'react';
import './Track.css';

class Track extends React.Component {

    constructor(props) {
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.renderAction = this.renderAction.bind(this);
        //this.previewTrack = this.previewTrack.bind(this)
    }

    addTrack(track) {
        console.log(this.props);
        //console.log('testing this out')
        console.log(this.props.tracks + " this is on the track js page")
        this.props.onAdd(this.props.tracks);
    }
    removeTrack() {
        console.log('removeTrack triggered');
        this.props.onRemove(this.props.tracks);
    }

   

    renderAction() {
        if(this.props.isRemoval === true) {
            return <a className="Track-action" onClick={this.removeTrack}>-</a>
        } else {
            return <a className="Track-action" onClick={this.addTrack}>+</a>
        }
    }
    
    

    render() {
        return (
            <div className="Track">
  <div className="Track-information">
    <h3>{this.props.tracks.name}</h3>
    <p>{this.props.tracks.artist}  |  {this.props.tracks.album} | <a href={this.props.tracks.preview_url} target="_blank">Preview</a></p>
  </div>
  {this.renderAction()}
</div>
        )
    }
}

export default Track;