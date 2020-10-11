//动态适配屏幕的高宽
function changeFrameHeight() {
    var ifm = document.getElementById("myiframe");
    ifm.height = document.documentElement.clientHeight + 15;
    ifm.width = document.documentElement.offsetWidth + 10;
}

window.onresize = function () { changeFrameHeight(); }

$(function () { changeFrameHeight(); });

//开始播放视频
function startplay() {
    
    var video = document.getElementById("myiframe");
    video.play();

    setTimeout(() => {
        var iframeImg = document.getElementById("iframeImg");
        iframeImg.style.display = "none";
        iframeImg.style.visibility = "hidden";
    }, 1000);
}