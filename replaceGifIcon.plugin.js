//META{"name":"cig","displayName":"micelle","website":"https://github.com/micelle","source":"https://github.com/micelle/dc_BetterDiscordPlugins"}*//

const cig = function() {};
cig.errorList = [];
cig.log = (msg, data) => {
  const name = cig.prototype.getName();
  console.log(`%c[${name}] ${msg}`, 'color:#C9242F', data);
};
cig.prototype.start = () => cig.log('start', cig.prototype.getVersion());
cig.prototype.load = () => cig.log('load', cig.prototype.getVersion());
cig.prototype.unload = () => cig.log('unload', cig.prototype.getVersion());
cig.prototype.stop = () => cig.log('stop', cig.prototype.getVersion());
cig.prototype.onMessage = () => {};
cig.prototype.onSwitch = () => {};
cig.prototype.observer = (e) => {
  // .da-image: アイコン
  // .da-avatarSmall: 通話中のリスト
  // .stop-animation: 自分のアイコン
  $('body').find('.da-image, .da-avatarSmall, .stop-animation').each((index, element) => {
    // チェック済みは処理しない
    const name = cig.prototype.getName();
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
    if (cig.errorList[fileName]) return;
    // 画像の読み込み
    const image = new Image();
    image.src = gifURL;
    image.style = 'width:100%';
    image.onload = () => $(element).css('overflow', 'hidden').html(image);
    image.onerror = () => cig.errorList[fileName] = 1;
  });
};
cig.prototype.getName = () => 'ReplaceGifIcon';
cig.prototype.getDescription = () => 'GIFアニメーションのアイコンに置き換えます。\nReplace with an GIF animated icon.';
cig.prototype.getVersion = () => '1.0.0';
cig.prototype.getAuthor = () => 'micelle';