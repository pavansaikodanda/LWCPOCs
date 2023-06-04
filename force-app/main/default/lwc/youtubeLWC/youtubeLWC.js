import { LightningElement, track } from 'lwc';

const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';

export default class YoutubeLWC extends LightningElement {

    @track videos = [];
    @track mainVideoUrl = '';
    @track mainVideoTitle = '';
    @track mainVideoDescription = '';
    searchText = 'Salesforce';

    updateSearchText(event) {
        this.searchText = event.target.value;
    }

    handleYoutubeSearch() {
        fetch(YOUTUBE_API_URL +`?part=snippet&maxResults=20&type=video&q=${this.searchText}&key=AIzaSyCCrdIbYAtodJp1jt8lWYtS_GF1tg02OWA`,{
            method: 'GET'
        }).then(response => response.json())
        .then(data => {
            this.videos = data.items;
            this.selectMainVideo(this.videos[0]);
        });
    }

    handleVideoClick(event) {
        const selectedVideoId = event.currentTarget.dataset.id;
        const selectedVideo = this.videos.find(video => video.id.videoId === selectedVideoId);
    
        this.mainVideoUrl = 'https://www.youtube.com/embed/' + selectedVideo.id.videoId + '?autoplay=1';
        this.mainVideoTitle = selectedVideo.snippet.title;
        this.mainVideoDescription = selectedVideo.snippet.description;
    }
    
    selectMainVideo(video) {
        this.mainVideoUrl = 'https://www.youtube.com/embed/' + video.id.videoId + '?autoplay=1';
        this.mainVideoTitle = video.snippet.title;
        this.mainVideoDescription = video.snippet.description;
    }

    handleKeyDown(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            this.handleYoutubeSearch();
        }
    }
    
}