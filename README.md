BetterDiscordのプラグイン
=====

[BetterDiscord](https://github.com/rauenzi/BetterDiscordApp/releases)で利用できるプラグインです。

BetterDiscordの利用方法については各自調べてください。

## 使い方
1. 【ブラウザ】下記の使いたいプラグイン名をクリック。
2. 【ブラウザ】<kbd>Ctrl</kbd>+<kbd>S</kbd>などでプラグインを保存。
3. 【パソコン】「ファイル名を指定して実行(<kbd>Windows</kbd>+<kbd>R</kbd>)」にて`%appdata%\BetterDiscord\plugins`を入力。
4. 【パソコン】開いたフォルダーへダウンロードしたプラグインを入れる。
5. 【Discord】歯車マークから設定を開く。
6. 【Discord】`Plugins`にて入れたプラグインを有効にする。設定が必要な場合は各種設定を行なう。

## プラグイン
![update](https://prfac.com/wp-content/uploads/2019/07/0d40a5e4a645fc6b96e767d64ac0878e-3.jpg)
- 全てのプラグインに自動更新機能が付いています。  
  バージョンアップがあると上部にお知らせが出ますので、プラグイン名をクリックすることで更新が完了となります。

### [ChangeTimestamp.plugin.js](https://raw.githubusercontent.com/micelle/BetterDiscordPlugins/master/plugins/ChangeTimestamp.plugin.js)
![ChangeTimestamp](https://prfac.com/wp-content/uploads/2019/07/0d40a5e4a645fc6b96e767d64ac0878e-1.jpg)
- [ブログ](https://prfac.com/change-timestamp-in-message/)
- チャットの日付を「1月1日(火) 10時30分」表記にします。  
  昨年以前の場合は「2018年1月1日(月) 10時30分」表記になります。
- 設定はありません。
- Not support English.

### [ReplaceGifIcon.plugin.js](https://raw.githubusercontent.com/micelle/BetterDiscordPlugins/master/plugins/ReplaceGifIcon.plugin.js)
![ReplaceGifIcon](https://prfac.com/wp-content/uploads/2019/07/ezgif-1-333bbc239b4f.gif)
- 静止画になっているアイコンを全てGIFアニメーションのアイコンに置き換えます。
- 難点はConsoleに`GET https://cdn.discordapp.com/avatars/000/abc.gif?size=128 415`と表示されてしまう点のみ。
- 設定はありません。
- Replace with an GIF animated icon.
- Support English.

### [ConnectionTime.plugin.js](https://raw.githubusercontent.com/micelle/BetterDiscordPlugins/master/plugins/ConnectionTime.plugin.js)
![ConnectionTime](https://prfac.com/wp-content/uploads/2019/07/ezgif-1-55b590270dbe.gif)
- ボイスチャンネルに接続している時間を表示します。
- [ConnectionTime.plugin.js](https://gist.github.com/katabame/ef65c6379c8d50af8702c5932c6dbf5b)を参考にしました。
- 設定はありません。
- Displays how long connected to VoiceChannel.
- Support English.

### [Twemoji.plugin.js](https://raw.githubusercontent.com/micelle/BetterDiscordPlugins/master/plugins/Twemoji.plugin.js)
![Twemoji](https://prfac.com/wp-content/uploads/2019/07/0d40a5e4a645fc6b96e767d64ac0878e.gif)
- 絵文字をTwemojiで置換します。
- 設定はありません。
- Replace Emoji with Twemoji.
- Support English.
