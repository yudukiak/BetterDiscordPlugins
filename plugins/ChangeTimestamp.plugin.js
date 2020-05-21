//META{"name":"ChangeTimestamp","displayName":"micelle","website":"https://github.com/micelle","source":"https://github.com/micelle/dc_BetterDiscordPlugins"}*//

const ChangeTimestamp = function() {};
ChangeTimestamp.prototype.log = function(msg, data) {
  const name = this.getName();
  console.log(`%c[${name}] ${msg}`, 'color:#C9242F', data);
};
ChangeTimestamp.prototype.whatTimeIsIt = function(t) {
  const date = (() => {
    if (t == null) return new Date();
    if (/^(\d+)$/.test(t)) return new Date(Number(t));
    return new Date(t);
  })();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = this.zeroPadding(date.getHours());
  const minutes = this.zeroPadding(date.getMinutes());
  const seconds = this.zeroPadding(date.getSeconds());
  const week = date.getDay();
  const weekStr = ['日', '月', '火', '水', '木', '金', '土'][week];
  const nowYear = new Date().getFullYear();
  const text = `${month}月${day}日(${weekStr}) ${hours}:${minutes}`;
  return (year === nowYear) ? text : `${year}年${text}`;
};
ChangeTimestamp.prototype.zeroPadding = function(value) {
  return value < 10 ? `0${value}` : value;
};
ChangeTimestamp.prototype.update = function() {
  const url = `https://micelle.github.io/BetterDiscordPlugins/plugins/${this.getName()}.plugin.js`
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
ChangeTimestamp.prototype.start = function() {
  this.log('start', this.getVersion());
  this.update();
  
  // 開発終了のお知らせ
  const title = '開発が終了しました';
  const name = this.getName();
  const version = this.getVersion();
  const content = `${name} ${version}の開発は終了しました。本プラグインを削除お願いします。`;
  BdApi.alert(title, content);
};
ChangeTimestamp.prototype.load = function() {
  this.log('load', this.getVersion());
};
ChangeTimestamp.prototype.unload = function() {
  this.log('unload', this.getVersion());
};
ChangeTimestamp.prototype.stop = function() {
  this.log('stop', this.getVersion());
};
ChangeTimestamp.prototype.onMessage = function() {};
ChangeTimestamp.prototype.onSwitch = function() {};
ChangeTimestamp.prototype.observer = function(e) {
  
  return; // 処理を終了
  
  const target = e.target;
  const classList = target.classList;
  if (classList != null) {
    $(target).find('.da-timestampCozy, .da-timestamp, .da-tooltip').each((index, element) => {
      // 2020年2月4日 火曜日 00:02 => 2月4日(火) 00時02分
      /*
      // クラッシュするので放置…
      $('time.da-edited:hover').each((hoverIndex, hoverElement) => {
        const html = target.innerHTML;
        if (/\d+月\d+日\(.+\) \d+:\d+/.test(html) || !/\d+月\d+日 .+曜日 \d+:\d+/.test(html)) return;
        const htmlRep = (function(){
          if (html == null) return html;
          const y = new Date().getFullYear() + '年';
          const d = (new RegExp(y).test(html)) ? html.replace(new RegExp(y), '') : html;
          const r = d.replace(/ (.)曜日/, '($1)');
          return r;
        })();
        target.innerHTML = htmlRep;
      });
      */
      const text = $(element).children().text();
      if (/\d+月\d+日\(.+\) \d+:\d+/.test(text)) return;
      const label = $(element).children().attr('aria-label');
      const labelRep = (function(){
        if (label == null) return label;
        const y = new Date().getFullYear() + '年';
        const d = (new RegExp(y).test(label)) ? label.replace(new RegExp(y), '') : label;
        const r = d.replace(/ (.)曜日/, '($1)');
        return r;
      })();
      if (label != null) $(element).children().text(labelRep);
    });
  }
};
ChangeTimestamp.prototype.getName = () => 'ChangeTimestamp';
ChangeTimestamp.prototype.getDescription = function() {
  const nowTime = this.whatTimeIsIt();
  const oldDate = new Date();
  oldDate.setFullYear(oldDate.getFullYear() - 1);
  const oldTime = this.whatTimeIsIt(oldDate);
  return `チャットの日付を「${nowTime}」表記にします。\n昨年以前の場合は「${oldTime}」表記になります。`;
};
ChangeTimestamp.prototype.getVersion = () => '1.1.4';
ChangeTimestamp.prototype.getAuthor = () => 'micelle';
