const clientID = "25b4bc3aa4924ed7bb4fb19027a073b1";
let spotifytkn = "";
const redirect_uri = "http://localhost:3000";




const Spotify = {

	getAuth() {
		const website = window.location.href;
		const getTkn = website.match(/access_token=([^&]*)/);
		if (getTkn) {
			spotifytkn = getTkn[1];
			return spotifytkn;	
		} else {
			const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`
			window.location = authUrl;
		}
    },
    
    savePlaylist(playname,arraytracks) {
		console.log(arraytracks + ' this is arraytracks');
        if(playname == null || arraytracks == null) {
            return
        }

        return fetch (`https://api.spotify.com/v1/me`, {
            headers: {
                Authorization: `Bearer ${spotifytkn}`
            }
        }).then (response => {
            console.log('returned');
            return response.json().then(jsonResponse => {if (jsonResponse) {
                console.log('response found');
                let userid = jsonResponse.id;
                console.log(userid);

                fetch(`https://api.spotify.com/v1/users/${userid}/playlists/`, {
                    headers: {
                        Authorization: `Bearer ${spotifytkn}`
                    },
                    method: "POST",
                    body: JSON.stringify({name: playname})
                }).then (response => {
                    console.log('playlistname returned');
                    return response.json().then(jsonResponse => {if (jsonResponse){
                        console.log('response2 found');
                        let playlistID = jsonResponse.id;
						console.log(playlistID + 'this is playlist id');
						console.log(arraytracks + ' arraytracks');
						fetch(`https://api.spotify.com/v1/users/${userid}/playlists/${playlistID}/tracks?uris=${arraytracks}`, {
							headers: {
								Authorization: `Bearer ${spotifytkn}`
							},
							method: "POST"
						})
                    }})
				})
				
				
            

            }

            })
        }
        )},

	search(term) {
		let getTkn = Spotify.getAuth();
		//window.location(getTkn);
		console.log('starting');
		return fetch (`https://api.spotify.com/v1/search?q=${term}&type=track`, {
			headers: {
				Authorization: `Bearer ${spotifytkn}`
			}
		}).then (response => {
			console.log('mapping');
			return response.json().then(jsonResponse => {if (jsonResponse.tracks){
				console.log('array found');
				 return jsonResponse.tracks.items.map(tracks => (
					{
						id: tracks.id,
						name: tracks.name,
						popularity: tracks.popularity,
						preview_url: tracks.preview_url,
						album: tracks.album.name,
						artist: tracks.artists[0].name,
						track_number: tracks.track_number

					}
					
				)
			)
		}
	}
) 
		}
		)
		
	}
}
			

export default Spotify;