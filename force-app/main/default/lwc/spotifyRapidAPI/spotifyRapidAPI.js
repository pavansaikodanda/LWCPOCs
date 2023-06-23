import { LightningElement, track } from 'lwc'
const URL = 'https://spotify23.p.rapidapi.com/search/'

export default class SpotifyRapidAPI extends LightningElement {
  searchText
  songs
  @track albums = []
  @track album
  @track albumTracks = []
  audioPlayerRef
  @track selectedAlbum
  selectedAlbumBoolean=false;
  constructor () {
    super()
    if (!this.searchText) {
      this.searchText = 'Telugu'
    }
    this.handleSpotify()
  }
  updateSearchText (event) {
    this.searchText = event.target.value
  }

  handleSpotify () {
    fetch(
      URL +
        `?q=${this.searchText}&type=multi&offset=0&limit=10&numberOfTopResults=5`,
      {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key':
            '6c81fc4cedmsh4f239b5ee7c3167p1a8b87jsn52956bcba8e1',
          'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        console.log('Response data:', data) // Add this line to inspect the response data
        this.albums = data.albums.items.map(album => {
            const sources = album.data.coverArt.sources;
            const largestImageSource = sources[0];
            const mediumImageSource = sources[1]; // This assumes that the second source is always the medium image
            album.data.largestImageUrl = largestImageSource.url;
            album.data.mediumImageUrl = mediumImageSource.url;
            return album;
           
        })
        console.log('data', data)
      })
      .catch(error => {
        console.error('Error fetching Spotify data:', error)
      })
  }

  async handleAlbumClick (event) {
    const uri = event.target.dataset.id;
  //  this.selectedAlbumBoolean = true;
   // this.selectedAlbum = event.target.dataset.image;
   // console.log('selectedAlbum',this.selectedAlbum);
    const sp = uri.split(':')
    const albumId = sp[2]
    console.log('albumID', albumId)
    const url = `https://spotify23.p.rapidapi.com/album_tracks/?id=${albumId}`
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '6c81fc4cedmsh4f239b5ee7c3167p1a8b87jsn52956bcba8e1',
        'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
      }
    }

    const response = await fetch(url, options)
    const result = await response.json()
    this.selectedAlbumBoolean = true;
    this.selectedAlbum = event.target.dataset.image;
   console.log('selectedAlbum',this.selectedAlbum);
    console.log('result', result)
    const albumData = result.data.album
    console.log('albumData', albumData)

    const trackIds = albumData.tracks.items
      .map(track => track.track.uri.split(':')[2])
      .join(',')
    console.log(trackIds)

    if (trackIds) {
      fetch('https://spotify23.p.rapidapi.com/tracks/?ids=' + trackIds, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key':
            '6c81fc4cedmsh4f239b5ee7c3167p1a8b87jsn52956bcba8e1',
          'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
      })
        .then(response => response.json())
        .then(data => {
          const responseData = data
          const tracks = responseData.tracks
          this.albumTracks = tracks.map(track => ({
            track: track,
            previewUrl: track.preview_url
          }))
        })
        .catch(error => {
          console.error('Error fetching track data:', error.message)
        })
        
    }
  }
  handleTrackClick (event) {
    const previewUrl = event.target.dataset.previewUrl
    if (this.audioPlayerRef) {
      this.audioPlayerRef.pause()
    }
    this.audioPlayerRef = new Audio(previewUrl)
    this.audioPlayerRef.play()
  }

}
