var widget;
var player;
var videoID;

$( function() {
    loadFacebookSDK();
    loadRecorder();
});

function loadFacebookSDK() {
    (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&appId=844547028921055&version=v2.0";
    fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
}

function loadRecorder() {
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

function updateShareIcons() {
    var url = "https://www.youtube.com/watch?v=" + videoID;
    var tumblr_video_embed_code = url;
    var tumblr_video_caption = "Record your reaction at reactionly.redirectme.net -- Reactionly - Record Your Reaction!";

    $("#reddit").attr("href", "http://www.reddit.com/submit?url=" + url + "&title=Reactionly");
    $("#reddit").attr("onclick", "javascript:window.open(this.href,'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');return false;");
    $("#youtube").attr("onclick", "youtubeOpen()");
    $("#twitter").attr("href", "https://twitter.com/intent/tweet?text=Reactionly&url=" + url);
    $("#twitter").attr("onclick", "javascript:window.open(this.href,'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');return false;");
    $("#google").attr("href", "https://plus.google.com/share?url=" + url);
    $("#google").attr("onclick", "javascript:window.open(this.href,'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');return false;");
    $("#facebook").attr("onclick", "shareFB()");
    $("#tumblr").attr("href", "http://www.tumblr.com/share/video?embed=" + encodeURIComponent(tumblr_video_embed_code) + "&caption=" + encodeURIComponent(tumblr_video_caption));
    $("#tumblr").attr("title", "Share on Tumblr");
    $("#tumblr").attr("onclick", "window.open(this.href, 'mywin','left=20,top=20,width=500,height=500,toolbar=1,resizable=0'); return false;");
    $("#pinterest").attr("href", "https://pinterest.com/pin/create/button/?url=" + url + "&description=Reactionly&media=YOUR-IMAGE-SRC");
}

function onYouTubeIframeAPIReady() {
    widget = new YT.UploadWidget('widget', {
        width: 640,
        height: 390,
        events: {
            'onProcessingComplete': onProcessingComplete,
            'onApiReady': onApiReady,
            'onStateChange': onStateChange,
            'onVideoIdAvailable': onVideoIdAvailable,
            'onUploadSuccess': onUploadSuccess
        }
    });
}

function onProcessingComplete(event) {
    player = new YT.Player('reaction', {
            height: 390,
            width: 640,
            videoId: videoID,
            playerVars: {
                autoplay: 1,
                loop: 1,
                playlist: videoID
            },
            events: {}
    });
}

function onUploadSuccess(event) {
    // Remove Recorder widget and Youtube player from view
    $("#widget").addClass("hide");
    $("#player").remove();
    // Un-hide our social media share icons
    $("#share").removeClass("hide");
    $("#reaction").html("<h3>Your video will display here when finished processing.<br><i class='fa fa-spinner fa-pulse fa-4x'></i></h3>");

    updateShareIcons();
}

function onVideoIdAvailable(event) {
    // Capture the video ID and save it into our global var
    videoID = event.data.videoId;
}

function onApiReady(event) {
    widget.setVideoTitle("Reactionly - Record Your Reaction!");
    widget.setVideoDescription("Record your reaction at reactionly.redirectme.net -- Reactionly - Record Your Reaction!");
    widget.setVideoKeywords("reactionly");
}

function onStateChange(event) {
    if (event.data.state == YT.UploadWidgetState.RECORDING) {
      player = new YT.Player('player', {
          height: 390,
          width: 640,
          videoId: "HZa1iFO0Juk",
          playerVars: {
              autoplay: 1
          },
          events: {}
      });
    }
    else if (event.data.state == YT.UploadWidgetState.PENDING) {
        player.stopVideo();
    }
}

function share() {
    var url = "https://www.youtube.com/watch?v=" + videoID;


}

function shareFB() {
    FB.ui({
    method: 'share',
    href: 'https://www.youtube.com/watch?v=' + videoID,
    }, function(response){});
}

function youtubeOpen() {
    window.open("https://www.youtube.com/watch?v=" + videoID, "_blank");
}
