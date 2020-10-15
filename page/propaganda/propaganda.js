$(function () {

  // $("#bottom_button").css({ 'transform': 'scale(1.3)', 'transition': 'all 1.0s' });
  // setTimeout(function () {
  //     $("#bottom_button").css({ 'transform': 'scale(1)', 'transition': 'all 1.0s' });
  // }, 1200)
  localStorage.setItem('playmp4','https://www.incursion.wang/freeBuy/Video/20190812175713 00_00_59-00_01_14.mp4');
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
      // url: "https://www.52yifu.com/cloud-h5/wxpay/share?",
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
          var title = "点击领取15元新人微信红包👆";
          var desc = "这是衣蝠官方为回馈用户提供的福利，直接打入微信零钱，限时领取！💰";
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
      // url: "https://www.52yifu.com/cloud-wxcx/user/GetRobotCodeOne?version=V1.31&channel=68",
      url:'/cloud-wxcx/user/GetRobotCodeOne?version=V1.31&channel=68',
      type: 'post',
      async: false,
      dataType: "json",
      success: function (data) {
          if (data) {
              // console.log('data='+ data);
              // var node = document.getElementById('qrcodeimg');
              // node.src = data.data;
          }
      },
      error: function (err) {
          alert('请求数据失败');
      },
  });

}

function hide_fugai() {
  //回到顶部
  $('body').scrollTop(0);
  //隐藏覆盖小窗
  setTimeout(() => {
      var qrcodeimg = document.getElementById("qrcodeimg-fugai");
      qrcodeimg.style.display = "none";
      qrcodeimg.style.visibility = "hidden";

      var zhiwenImg = document.getElementById("zhiwenimg-fugai");
      zhiwenImg.style.display = "none";
      zhiwenImg.style.visibility = "hidden";
  }, 1000);
}

