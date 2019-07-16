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
ReplaceGifIcon.prototype.start = function() {
  this.log('start', this.getVersion());
  this.update();
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
  // .da-image: アイコン, .da-avatarSmall: 通話中のリスト, .stop-animation: 自分のアイコン
  $('.da-image, .da-avatarSmall, .stop-animation').each((index, element) => {
    // チェック済みは処理しない
    const name = this.getName();
    if ($(element).data(name)) return;
    $(element).data(name, true);
    // styleを持ってなければ処理しない
    const style = $(element).css('background-image');
    if (!/\.(png|webp)/.test(style)) return;
    // 画像のチェック
    const URL = style.match(/url\("(.+)"\)/)[1]; // 画像のURLを抜き出す
    const gifURL = URL.replace(/\.(png|webp)/, '.gif'); // 画像のURLをGIF用に置換
    const fileName = URL.match(/\/([^/]*)\.(png|webp)/)[1]; // ファイル名を抜き出す
    if (!/cdn\.discordapp\.com/.test(gifURL)) return; // デフォルトアイコンは処理しない
    if (this.errorList[fileName]) return; // errorListに居たら処理しない
    // 画像の読み込み
    const image = new Image();
    image.src = gifURL;
    image.style = 'width:100%';
    image.onload = () => {
      ($(element).hasClass('da-avatarSmall'))
      ? $(element).css('background-image', `url(${gifURL})`)
      : $(element).css('overflow', 'hidden').html(image);
    };
    image.onerror = () => this.errorList[fileName] = 1;
  });
};
ReplaceGifIcon.prototype.getName = () => 'ReplaceGifIcon';
ReplaceGifIcon.prototype.getDescription = () => lang === 'ja' ? 'GIFアニメーションのアイコンに置き換えます。' : 'Replace with an GIF animated icon.';
ReplaceGifIcon.prototype.getVersion = () => '1.1.0';
ReplaceGifIcon.prototype.getAuthor = () => 'micelle';
