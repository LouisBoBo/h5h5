$(function () {
    getswiteen();
    getqrcodeimg();//获取机器人二维码

    //对url进行编码
    var localUrl = encodeURIComponent(location.href.split('#')[0]);
    //url传到后台格式
    var Url = "url=" + localUrl;
    //这几个参数都是后台从微信公众平台获取到的
    var nonceStr, signature, timestamp, appId, shareUrl;
    console.log('我是最胖的');
    $.ajax({
        //后台获取参数接口
        url: "/cloud-h5/wxpay/share?",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Token", getCookie("token"));
        },
        type: 'post',
        datatype: 'json',
        data: Url,
        success: function (data) {
            //得到参数
            var appId = data.appId;
            var nonceStr = data.nonceStr;
            var signature = data.signature;
            var timestamp = data.timestamp;
            var shareUrl = location.href;
            //通过微信config接口注入配置
            wx.config({
                debug: false, // 默认为false  为true的时候是调试模式，会打印出日志
                appId: appId,
                timestamp: timestamp,
                nonceStr: nonceStr,
                signature: signature,
                jsApiList: [
                    'checkJsApi',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeibo'
                ]
            });

            //配置自定义分享内容
            var title = "点击赚取10倍奖励金👆";
            var desc = "30天内您获得1000元+奖励金的概率高达98%！💰💰";
            var link = shareUrl;
            var imgUrl = "https://www.incursion.wang/small-iconImages/heboImg/h5_sharetitleimage.jpg";
            wx.ready(function () {
                wx.onMenuShareAppMessage({
                    title: title, // 分享标题
                    desc: desc, // 分享描述
                    link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: imgUrl, // 分享图标
                    success: function () {
                        // 设置成功
                        console.log('设置成功');
                    }
                });
                wx.onMenuShareTimeline({
                    title: title, // 分享标题
                    desc: desc, // 分享描述
                    link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: imgUrl, // 分享图标
                    success: function () {
                        // 设置成功
                        console.log('设置成功');
                    }
                });
                wx.onMenuShareQQ({
                    title: title, // 分享标题
                    desc: desc, // 分享描述
                    link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: imgUrl, // 分享图标
                    success: function () {
                        // 设置成功
                        console.log('设置成功');
                    }
                });
            });
        },
        error: function (err) {

        },
    });

    function getCookie(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        return (arr = document.cookie.match(reg)) ? unescape(arr[2]) : null;
    };
})

//获取机器人二维码
function getqrcodeimg() {
    $.ajax({
        //后台获取参数接口
        url: "/cloud-wxcx/wxcxQRcode/getWxcxQRcode?version=V1.31&channel=68",
        type: 'post',
        async: false,
        dataType: "json",
        success: function (data) {
            if (data) {
                var message = window.localStorage.getItem('localkey');
                var backview = document.getElementById('baseview');
                var nextbackview = document.getElementById('nextbackview');
                if (message) {
                    backview.hidden = true;
                    nextbackview.hidden = false;

                    backview.style.width = 0;
                    backview.style.height = 0;

                    var node = document.getElementById('nextcodeImage');
                    node.src = 'https://www.incursion.wang/' + 'small-iconImages/heboImg/kefu_message.jpg';

                } else {
                    backview.hidden = false;
                    nextbackview.hidden = true;

                    nextbackview.style.width = 0;
                    nextbackview.style.height = 0;

                    console.log('data=' + data);
                    var node = document.getElementById('codeImage');
                    node.src = 'https://www.incursion.wang/' + data.QRcode;

                    var base = document.getElementById('baseImage');
                    base.src = 'https://www.incursion.wang/' + 'small-iconImages/heboImg/newest_redhongbaoImg.jpg'
                }

                window.localStorage.setItem('localkey', '我是最胖的');
            }
        },
        error: function (err) {
            alert('请求错误');
        },
    });

}

function getswiteen() {
    var back = document.getElementById("backview");

    back.height = document.documentElement.clientHeight;
    back.width = document.documentElement.offsetWidth;

    var aScreen = document.getElementById("baseImage");
    var padding_top = (back.height - aScreen.offsetHeight) / 2;  //因为此div在页面中只用了一次且以后不会改变，所以写了数值，如果是不确定的，获取到高度放着这里就可以
    aScreen.style.marginTop = padding_top + "px";

    var bScreen = document.getElementById("codeImage");
    var padding_top = (back.height - bScreen.offsetHeight) / 2 + 140;  //因为此div在页面中只用了一次且以后不会改变，所以写了数值，如果是不确定的，获取到高度放着这里就可以
    bScreen.style.paddingTop = padding_top + "px";
}

