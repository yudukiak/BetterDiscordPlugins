//META{"name":"ChangeTimestamp","displayName":"micelle","website":"https://github.com/micelle","source":"https://github.com/micelle/dc_BetterDiscordPlugins"}*//

const ChangeTimestamp = function() {};
ChangeTimestamp.prototype.log = (msg, data) => {
  const name = ChangeTimestamp.prototype.getName();
  console.log(`%c[${name}] ${msg}`, 'color:#C9242F', data);
}
ChangeTimestamp.prototype.whatTimeIsIt = (t) => {
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
  const result = (() => {
    if (year === nowYear) return text;
    return `${year}年${text}`;
  })();
  return result;
};
ChangeTimestamp.prototype.start = () => ChangeTimestamp.prototype.log('start', ChangeTimestamp.prototype.getVersion());
ChangeTimestamp.prototype.load = () => ChangeTimestamp.prototype.log('load', ChangeTimestamp.prototype.getVersion());
ChangeTimestamp.prototype.unload = () => ChangeTimestamp.prototype.log('unload', ChangeTimestamp.prototype.getVersion());
ChangeTimestamp.prototype.stop = () => ChangeTimestamp.prototype.log('stop', ChangeTimestamp.prototype.getVersion());
ChangeTimestamp.prototype.onMessage = () => {};
ChangeTimestamp.prototype.onSwitch = () => {};
ChangeTimestamp.prototype.observer = (e) => {
  const target = e.target;
  const classList = target.classList;
  if (classList != null && /da-(app|systemPad|directionColumn|layerContainer)/.test(classList.value)) {
    $(target).find('time.da-timestampCozy, time.da-timestamp, .da-tooltip').each((index, element) => {
      const text = $(element).text();
      if (/\d+月\d+日\(.+\) \d+時\d+分/.test(text)) return;
      if ($(element).hasClass('da-tooltip')) {
        $('time.da-edited:hover').each((hoverIndex, hoverElement) => {
          const date = $(hoverElement).attr('datetime');
          const dateRep = ChangeTimestamp.prototype.whatTimeIsIt(date);
          const html = $(element).context.outerHTML;
          const htmlRep = html.replace(/<\/div>.+<\/div>/, `</div>${dateRep}</div>`);
          $(element).parent().html(htmlRep);
        });
      } else {
        const date = $(element).attr('datetime');
        const dateRep = ChangeTimestamp.prototype.whatTimeIsIt(date);
        $(element).text(dateRep);
      }
    });
  }
};
ChangeTimestamp.prototype.getName = () => 'ChangeTimestamp';
ChangeTimestamp.prototype.getDescription = () => {
  const nowTime = ChangeTimestamp.prototype.whatTimeIsIt();
  const oldDate = new Date();
  oldDate.setFullYear(oldDate.getFullYear() - 1);
  const oldTime = ChangeTimestamp.prototype.whatTimeIsIt(oldDate);
  return `チャットの日付を「${nowTime}」表記にします。\n昨年以前の場合は「${oldTime}」表記になります。`;
};
ChangeTimestamp.prototype.getVersion = () => '1.0.3';
ChangeTimestamp.prototype.getAuthor = () => 'micelle';

