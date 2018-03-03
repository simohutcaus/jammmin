import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';


class TrackList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="TrackList">
            {
            this.props.tracks.map(tracks => {
                return <Track key = {tracks.id} tracks={tracks} onAdd={this.props.onAdd} onRemove={this.props.onRemove}  />
            })
        }
    
</div>
        )
    }
}

export default TrackList;