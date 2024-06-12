// Define YouTubeVideo component
function YouTubeVideo(props) {
    const videoId = new URLSearchParams(window.location.search).get('youtubeId');

    return React.createElement('iframe', { 
        width: '560',
        height: '315',
        src: `https://www.youtube.com/embed/${videoId}`,
        frameborder: '0',
        allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
        allowfullscreen: true
    });
}

// Render the YouTubeVideo component into the 'video' container
ReactDOM.render(
    React.createElement(YouTubeVideo),
    document.getElementById('yvideo')
);
