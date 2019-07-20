//META{"name":"ReplaceGifIcon","displayName":"micelle","website":"https://github.com/micelle","source":"https://github.com/micelle/dc_BetterDiscordPlugins"}*//

const lang = document.documentElement.lang;

const ReplaceGifIcon = function() {};
ReplaceGifIcon.prototype.errorList = [];
ReplaceGifIcon.prototype.log = function(msg, data) {
  const name = this.getName();
  console.log(`%c[${name}] ${msg}`, 'color:#C9242F', data);
};
ReplaceGifIcon.prototype.update = function() {
  const url = `https://raw.githubusercontent.com/micelle/dc_BetterDiscordPlugins/master/plugins/${this.getName()}.plugin.js`;
  let libraryScript = document.getElementById('ZLibraryScript');
  if (!libraryScript || !window.ZLibrary) {
    if (libraryScript) libraryScript.parentElement.removeChild(libraryScript);
    libraryScript = document.createElement('script');
    libraryScript.setAttribute('type', 'text/javascript');
    libraryScript.setAttribute('src', 'https://rauenzi.github.io/BDPluginLibrary/release/ZLibrary.js');
    libraryScript.setAttribute('id', 'ZLibraryScript');
    document.head.appendChild(libraryScript);
  }
  if (window.ZLibrary) ZLibrary.PluginUpdater.checkForUpdate(this.getName(), this.getVersion(), url);
  else libraryScript.addEventListener('load', () => {
    ZLibrary.PluginUpdater.checkForUpdate(this.getName(), this.getVersion(), url);
  });
};
ReplaceGifIcon.prototype.addStyle = function() {
  const styleId = this.getName() + '-style';
  if (document.getElementById(styleId)) return;
  const head = document.getElementsByTagName('head')[0];
  const style = document.createElement('style');
  const css = 'div.da-avatar:before{display:none}';
  const rule = document.createTextNode(css);
  style.id = styleId;
  style.type = 'text/css';
  style.appendChild(rule);
  head.appendChild(style);
};
ReplaceGifIcon.prototype.replaceImage = function(elm) {
  // .da-avatar: アイコン, .da-avatarSmall: 通話中のリスト
  elm.find('img.da-avatar, .da-avatarSmall').each((index, element) => {
    const name = this.getName();
    if ($(element).data(name)) return;
    $(element).data(name, true);
    const URL = (() => {
      const style = $(element).css('background-image');
      if (/\.(png|webp)/.test(style)) return style.match(/url\("(.+)"\)/)[1];
      if ($(element).hasClass('da-avatar')) return $(element).attr('src');
      return null;
    })();
    if (URL == null || /\.gif/.test(URL)) return;
    const gifURL = URL.replace(/\.(png|webp)/, '.gif'); // 画像のURLをGIF用に置換
    const fileName = URL.match(/\/([^/]*)\.(png|webp)/)[1]; // ファイル名を抜き出す
    if (!/cdn\.discordapp\.com/.test(gifURL) || this.errorList[fileName]) return;
    const image = new Image();
    image.src = gifURL;
    image.onload = () => {
      if ($(element).hasClass('da-avatarSmall')) {
        this.log('element', element);
        $(element).css('background-image', `url(${gifURL})`);
      } else {
        const elmClass = $(element).attr('class');
        const div = $("<div></div>").addClass(elmClass).css({
          "background-color": "#18191c",
          "background-size": "100%",
          "background-image": `url(${gifURL})`
        });
        $(element).parent().html(div);
      }
    };
    image.onerror = () => this.errorList[fileName] = 1;
  });
};
ReplaceGifIcon.prototype.start = function() {
  this.log('start', this.getVersion());
  this.update();
  this.addStyle();
  this.replaceImage($('body'));
};
ReplaceGifIcon.prototype.load = function() {
  this.log('load', this.getVersion());
};
ReplaceGifIcon.prototype.unload = function() {
  this.log('unload', this.getVersion());
};
ReplaceGifIcon.prototype.stop = function() {
  this.log('stop', this.getVersion());
};
ReplaceGifIcon.prototype.onMessage = function() {};
ReplaceGifIcon.prototype.onSwitch = function() {};
ReplaceGifIcon.prototype.observer = function(e) {
  this.replaceImage($(e.target));
};
ReplaceGifIcon.prototype.getName = () => 'ReplaceGifIcon';
ReplaceGifIcon.prototype.getDescription = () => lang === 'ja' ? 'GIFアニメーションのアイコンに置き換えます。' : 'Replace with an GIF animated icon.';
ReplaceGifIcon.prototype.getVersion = () => '1.1.1';
ReplaceGifIcon.prototype.getAuthor = () => 'micelle';
