//META{"name":"ReplaceGifIcon","displayName":"micelle","website":"https://github.com/micelle","source":"https://github.com/micelle/dc_BetterDiscordPlugins"}*//

const ReplaceGifIcon = function() {};
ReplaceGifIcon.prototype.errorList = [];
ReplaceGifIcon.prototype.log = (msg, data) => {
  const name = ReplaceGifIcon.prototype.getName();
  console.log(`%c[${name}] ${msg}`, 'color:#C9242F', data);
};
ReplaceGifIcon.prototype.start = () => ReplaceGifIcon.prototype.log('start', ReplaceGifIcon.prototype.getVersion());
ReplaceGifIcon.prototype.load = () => ReplaceGifIcon.prototype.log('load', ReplaceGifIcon.prototype.getVersion());
ReplaceGifIcon.prototype.unload = () => ReplaceGifIcon.prototype.log('unload', ReplaceGifIcon.prototype.getVersion());
ReplaceGifIcon.prototype.stop = () => ReplaceGifIcon.prototype.log('stop', ReplaceGifIcon.prototype.getVersion());
ReplaceGifIcon.prototype.onMessage = () => {};
ReplaceGifIcon.prototype.onSwitch = () => {};
ReplaceGifIcon.prototype.observer = (e) => {
  // .da-image: アイコン
  // .da-avatarSmall: 通話中のリスト
  // .stop-animation: 自分のアイコン
  $('body').find('.da-image, .da-avatarSmall, .stop-animation').each((index, element) => {
    // チェック済みは処理しない
    const name = ReplaceGifIcon.prototype.getName();
    if($(element).data(name)) return;
    $(element).data(name, true);
    // styleを持ってなければ処理しない
    const style = $(element).css('background-image');
    if (!/\.(png|webp)/.test(style)) return;
    // 画像のチェック
    const URL = style.match(/url\("(.+)"\)/)[1]; // 画像のURLを抜き出す
    const gifURL = URL.replace(/\.(png|webp)/, '.gif'); // 画像のURLをGIF用に置換
    const fileName = URL.match(/\/([^/]*)\.(png|webp)/)[1]; // ファイル名を抜き出す
    // デフォルトアイコンは処理しない
    if (!/cdn\.discordapp\.com/.test(gifURL)) return;
    // errorListに居たら処理しない
    if (ReplaceGifIcon.prototype.errorList[fileName]) return;
    // 画像の読み込み
    const image = new Image();
    image.src = gifURL;
    image.style = 'width:100%';
    image.onload = () => $(element).css('overflow', 'hidden').html(image);
    image.onerror = () => ReplaceGifIcon.prototype.errorList[fileName] = 1;
  });
};
ReplaceGifIcon.prototype.getName = () => 'ReplaceGifIcon';
ReplaceGifIcon.prototype.getDescription = () => 'GIFアニメーションのアイコンに置き換えます。\nReplace with an GIF animated icon.';
ReplaceGifIcon.prototype.getVersion = () => '1.0.1';
ReplaceGifIcon.prototype.getAuthor = () => 'micelle';
