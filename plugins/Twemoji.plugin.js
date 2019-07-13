//META{"name":"Twemoji","displayName":"micelle","website":"https://github.com/micelle","source":"https://github.com/micelle/dc_BetterDiscordPlugins"}*//

const lang = document.documentElement.lang;

const Twemoji = function() {};
Twemoji.prototype.log = function(msg, data) {
  const name = this.getName();
  console.log(`%c[${name}] ${msg}`, 'color:#C9242F', data);
};
Twemoji.prototype.addScript = function() {
  const head = document.getElementsByTagName('head')[0];
  // JavaScriptを埋め込む
  const script = document.createElement('script');
  script.id = 'twemoji-script';
  script.src = 'https://twemoji.maxcdn.com/v/latest/twemoji.min.js';
  const scriptElm = document.getElementById('twemoji-script');
  if (!scriptElm) head.appendChild(script);
  // CSSを埋め込む
  const style = document.createElement('style');
  const css = 'img.emoji[src^="https://twemoji"] {height:1em; width:1em; margin:0 .05em 0 .1em; vertical-align:-0.1em;}';
  const rule = document.createTextNode(css);
  style.id = 'twemoji-style';
  style.type = 'text/css';
  style.appendChild(rule);
  const styleElm = document.getElementById('twemoji-style');
  if (!styleElm) head.appendChild(style);
  // twemojiを実行
  if (scriptElm) this.startScript();
};
Twemoji.prototype.removeScript = function() {
  const scriptElm = document.getElementById('twemoji-script');
  if (scriptElm) scriptElm.parentNode.removeChild(scriptElm);
  const styleElm = document.getElementById('twemoji-style');
  if (styleElm) styleElm.parentNode.removeChild(styleElm);
};
Twemoji.prototype.startScript = function() {
  // TypeError: twemoji.parse is not a functionが出るのでその対策
  try {
    twemoji.parse(document.body);
  } catch (e) {}
};
Twemoji.prototype.start = function() {
  this.log('start', this.getVersion());
  this.addScript();
};
Twemoji.prototype.load = function() {
  this.log('load', this.getVersion());
};
Twemoji.prototype.unload = function() {
  this.log('unload', this.getVersion());
  this.removeScript();
};
Twemoji.prototype.stop = function() {
  this.log('stop', this.getVersion());
  this.removeScript();
};
Twemoji.prototype.onMessage = function() {};
Twemoji.prototype.onSwitch = function() {};
Twemoji.prototype.observer = function(e) {
  if (e.target.classList == null) return;
  this.startScript();
};
Twemoji.prototype.getName = () => 'Twemoji';
Twemoji.prototype.getDescription = () => lang === 'ja' ? '絵文字をTwemojiで置換。' : 'Replace Emoji with Twemoji.';
Twemoji.prototype.getVersion = () => '1.0.0';
Twemoji.prototype.getAuthor = () => 'micelle';
