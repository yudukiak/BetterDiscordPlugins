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
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const week = date.getDay();
  const weekStr = ['日', '月', '火', '水', '木', '金', '土'][week];
  const nowYear = new Date().getFullYear();
  const text = `${month}月${day}日(${weekStr}) ${hours}時${minutes}分`;
  return (year === nowYear) ? text : `${year}年${text}`;
};
ChangeTimestamp.prototype.update = function(url) {
  //const url = `https://raw.githubusercontent.com/micelle/dc_BetterDiscordPlugins/master/plugins/${this.getName()}.plugin.js`;
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
  //this.update();
  const oldURL = `https://raw.githubusercontent.com/micelle/dc_BetterDiscordPlugins/master/plugins/${this.getName()}.plugin.js`;
  const newURL = `https://micelle.github.io/BetterDiscordPlugins/plugins/${this.getName()}.plugin.js`;
  $.ajax({
    url: newURL,
    type: 'GET'
  })
  .done((data) => {
    ChangeTimestamp.prototype.update(newURL);
  })
  .fail((data) => {
    ChangeTimestamp.prototype.update(oldURL);
  });
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
  const target = e.target;
  const classList = target.classList;
  if (classList != null && /da-(app|systemPad|directionColumn|layerContainer)/.test(classList.value)) {
    $(target).find('time.da-timestampCozy, time.da-timestamp, .da-tooltip').each((index, element) => {
      const text = $(element).text();
      if (/\d+月\d+日\(.+\) \d+時\d+分/.test(text)) return;
      if ($(element).hasClass('da-tooltip')) {
        $('time.da-edited:hover').each((hoverIndex, hoverElement) => {
          const date = $(hoverElement).attr('datetime');
          const dateRep = this.whatTimeIsIt(date);
          const html = $(element).context.outerHTML;
          const htmlRep = html.replace(/<\/div>.+<\/div>/, `</div>${dateRep}</div>`);
          $(element).parent().html(htmlRep);
        });
      } else {
        const date = $(element).attr('datetime');
        const dateRep = this.whatTimeIsIt(date);
        $(element).text(dateRep);
      }
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
ChangeTimestamp.prototype.getVersion = () => '1.1.1';
ChangeTimestamp.prototype.getAuthor = () => 'micelle';
