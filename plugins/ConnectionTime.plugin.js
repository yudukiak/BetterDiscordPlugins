//META{"name":"ConnectionTime","displayName":"micelle","website":"https://github.com/micelle","source":"https://github.com/micelle/dc_BetterDiscordPlugins"}*//

const lang = document.documentElement.lang;
let second = 0;
let timer;

const ConnectionTime = function() {};
ConnectionTime.prototype.log = function(msg, data) {
  const name = this.getName();
  console.log(`%c[${name}] ${msg}`, 'color:#C9242F', data);
};
ConnectionTime.prototype.countStart = function() {
  const This = ConnectionTime.prototype; // thisがglobalになるので指定する
  const $elm = $('.da-rtcConnectionStatusConnected');
  if ($elm.length) {
    second++;
    const hms = (() => {
      const h = This.zeroPadding(second / 3600 | 0);
      const m = This.zeroPadding(second % 3600 / 60 | 0);
      const s = This.zeroPadding(second % 60);
      return lang === 'ja' ? `${h}時間${m}分${s}秒` : `${h}h${m}m${s}s`;
    })();
    $elm.children('.da-description').children('span').text(hms);
  } else {
    clearInterval(timer);
    second = 0;
  }
};
ConnectionTime.prototype.zeroPadding = function(value) {
  return value < 10 ? `0${value}` : value;
};
ConnectionTime.prototype.start = function() {
  this.log('start', this.getVersion());
  clearInterval(timer);
  timer = setInterval(this.countStart, 1000); // 通話中に更新した場合の対応
};
ConnectionTime.prototype.load = function() {
  this.log('load', this.getVersion());
  clearInterval(timer);
};
ConnectionTime.prototype.unload = function() {
  this.log('unload', this.getVersion());
  clearInterval(timer);
};
ConnectionTime.prototype.stop = function() {
  this.log('stop', this.getVersion());
  clearInterval(timer);
};
ConnectionTime.prototype.onMessage = function() {};
ConnectionTime.prototype.onSwitch = function() {};
ConnectionTime.prototype.observer = function(e) {
  const classList = e.target.classList;
  if (!classList || !/da-rtcConnectionStatusConnected/.test(classList.value)) return;
  clearInterval(timer);
  second = 0; // 新たな通話に入ったのでリセット
  timer = setInterval(this.countStart, 1000);
};
ConnectionTime.prototype.getName = () => 'ConnectionTime';
ConnectionTime.prototype.getDescription = () => lang === 'ja' ? 'ボイスチャンネルに接続している時間を表示します。' : 'Displays how long connected to VoiceChannel.';
ConnectionTime.prototype.getVersion = () => '1.0.0';
ConnectionTime.prototype.getAuthor = () => 'micelle';
