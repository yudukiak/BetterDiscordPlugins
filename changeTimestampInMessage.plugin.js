//META{"name":"ctm","displayName":"micelle","website":"https://github.com/micelle","source":"https://github.com/micelle/dc_BetterDiscordPlugins"}*//

const ctm = function() {};
const reg = /\d+月\d+日\(.+\) \d+時\d+分/;

ctm.log = (msg, data) => console.log(`%c[Change timestamp] ${msg}`, 'color:#C9242F', data);
ctm.whatTimeIsIt = (t) => {
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
ctm.hoverEdited = () => {
  $('time.da-edited').on('mouseenter', () => {
    const element = $('.da-tooltip');
    const text = $(element).text();
    if (reg.test(text)) return;
    const date = $(this).attr('datetime');
    const dateRep = ctm.whatTimeIsIt(date);
    $('.da-tooltip').text(dateRep);
  });
};
ctm.prototype.start = () => ctm.log('start', ctm.prototype.getVersion());
ctm.prototype.load = () => ctm.log('load', ctm.prototype.getVersion());
ctm.prototype.unload = () => ctm.log('unload', ctm.prototype.getVersion());
ctm.prototype.stop = () => ctm.log('stop', ctm.prototype.getVersion());
ctm.prototype.onMessage = () => {};
ctm.prototype.onSwitch = () => {};
ctm.prototype.observer = (e) => {
  const target = e.target;
  const trgClassList = target.classList;
  if (trgClassList != null && /da-(app|systemPad|directionColumn)/.test(trgClassList.value)) {
    $(target).find('time.da-timestampCozy, time.da-timestamp').each((index, element) => {
      const text = $(element).text();
      if (reg.test(text)) return;
      const date = $(element).attr('datetime');
      const dateRep = ctm.whatTimeIsIt(date);
      $(element).text(dateRep);
    });
  }
  ctm.hoverEdited();
};
ctm.prototype.getName = () => 'Change timestamp in message';
ctm.prototype.getDescription = () => {
  const nowTime = ctm.whatTimeIsIt();
  const oldDate = new Date();
  oldDate.setFullYear(oldDate.getFullYear() - 1);
  const oldTime = ctm.whatTimeIsIt(oldDate);
  return `チャットの日付を「${nowTime}」表記にします。\n昨年以前の場合は「${oldTime}」表記になります。`;
};
ctm.prototype.getVersion = () => '1.0.0';
ctm.prototype.getAuthor = () => 'micelle';

