$(function () {

    $("#bottom_button").css({ 'transform': 'scale(1.3)', 'transition': 'all 1.0s' });
    setTimeout(function () {
        $("#bottom_button").css({ 'transform': 'scale(1)', 'transition': 'all 1.0s' });
    }, 1200)
})

function hide_fugai() {
    //回到顶部
    $('body').scrollTop(0);
    //隐藏覆盖小窗
    setTimeout(() => {
        var ua = navigator.userAgent.toLowerCase();//获取判断用的对象

        var browser = {
            versions: function () {
                var u = navigator.userAgent, app = navigator.appVersion;
                return {         //移动终端浏览器版本信息
                    trident: u.indexOf('Trident') > -1, //IE内核
                    presto: u.indexOf('Presto') > -1, //opera内核
                    webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                    mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
                    iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                    iPad: u.indexOf('iPad') > -1, //是否iPad
                    webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
                };
            }(),
            language: (navigator.browserLanguage || navigator.language).toLowerCase()
        }
		//var appName ="20200703HuCuKGhE";
        if (browser.versions.mobile) {//判断是否是移动设备打开。
            var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
            if (ua.match(/MicroMessenger/i) == "micromessenger") {//在微信中打开
                var qrcodeimg = document.getElementById("qrcodeimg-fugai");
                qrcodeimg.style.display = "";
                qrcodeimg.style.visibility = "";    

                var safariImg = document.getElementById("safariImg");
                var windowImg = document.getElementById("windowImg");
                if(browser.versions.android)
                {
                    windowImg.src = 'https://www.incursion.wang/' + 'small-iconImages/heboImg/openOnwindow.png';
                    windowImg.style.display = "";
                    windowImg.style.visibility = "";
                }else{
                    safariImg.src = 'https://www.incursion.wang/' + 'small-iconImages/heboImg/openOnsafari.png';
                    safariImg.style.display = "";
                    safariImg.style.visibility = "";
                }
            }
            else{//其它移动端浏览器
                window.location.href = 'https://www.incursion.wang/yssj-app/' + appName + '.apk'
            }
        } else {
            //否则就是PC浏览器打开
            window.location.href = 'https://www.incursion.wang/yssj-app/' + appName + '.apk'

            //测试用
            // var qrcodeimg = document.getElementById("qrcodeimg-fugai");
            // qrcodeimg.style.display = "";
            // qrcodeimg.style.visibility = "";

            // var safariImg = document.getElementById("safariImg");
            // var windowImg = document.getElementById("windowImg");
            // if(browser.versions.android)
            // {
            //     windowImg.src = 'https://www.incursion.wang/' + 'small-iconImages/heboImg/openOnwindow.png';
            //     windowImg.style.display = "";
            //     windowImg.style.visibility = "";
            // }else{
            //     safariImg.src = 'https://www.incursion.wang/' + 'small-iconImages/heboImg/openOnsafari.png';
            //     safariImg.style.display = "";
            //     safariImg.style.visibility = "";
            // }
        }
    }, 500);
}