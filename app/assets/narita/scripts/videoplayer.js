class videoPlayer {
    constructor() {

    }
    init() {

    }
    init() {}

    openVideo(src) {
        var lightBoxVideo = document.getElementById('video');
        document.getElementById('video').style.display = 'block';
          document.getElementById('video').className = 'animations';
        lightBoxVideo.src = src;
        lightBoxVideo.play();
    };

    closeVideo() {
        var lightBoxVideo = document.getElementById('video');
        document.getElementById('video').style.display = 'none';
        lightBoxVideo.pause();
    };
}
