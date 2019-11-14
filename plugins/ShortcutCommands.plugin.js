//META{"name":"ShortcutCommands","displayName":"micelle","website":"https://github.com/micelle","source":"https://github.com/micelle/dc_BetterDiscordPlugins"}*//

const lang = document.documentElement.lang;
let commandList = [];
let SortableCreated = false; // 挙動が荒ぶるので制御してます… ↷( ó╻ò)

class ShortcutCommands {
  getName() {
    return 'ShortcutCommands';
  }
  getDescription() {
    return 'コマンド入力を少し楽にしてくれます。';
  }
  getVersion() {
    return '1.0.1';
  }
  getAuthor() {
    return 'micelle';
  }
  load() {
    this.log('load', this.getVersion());
    BdApi.linkJS('zeresLibraryScript', 'https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js');
    ZeresPluginLibrary.PluginUpdater.checkForUpdate(this.getName(), this.getVersion(), 'https://raw.githubusercontent.com/micelle/BetterDiscordPlugins/master/plugins/ShortcutCommands.plugin.js');
  }
  start() {
    this.log('start', this.getVersion());
    // 設定画面で使うライブラリ
    if (!global.Sortable || typeof Sortable != 'object') BdApi.linkJS('SortableScript', 'https://cdn.jsdelivr.net/npm/sortablejs@latest/Sortable.min.js');
    if (!global.BDFDB || typeof BDFDB != 'object' || !BDFDB.loaded) BdApi.linkJS('BDFDBScript', 'https://mwittrien.github.io/BetterDiscordAddons/Plugins/BDFDB.js');
    const loadCommandList = BdApi.loadData(this.getName(), 'commandList');
    if (loadCommandList) commandList = loadCommandList;
    // コマンド表示ボタンを設置
    this.setCommandButton();
    // コマンド表示
    $(document).on('click', '[aria-label="command"]', function() {
      const buttonItems = commandList.map(function(val, index) {
        if (/^category:.+/.test(val)) {
          const text = val.replace(/^category:/, '');
          const escape = ShortcutCommands.prototype.escapeHtml(text);
          const html = `<div name="recent" class="category-2U57w6 da-category">${escape}</div>`;
          return html;
        } else {
          const escape = ShortcutCommands.prototype.escapeHtml(val);
          const className = `${BDFDB.disCNS.button + BDFDB.disCNS.buttonlookfilled + BDFDB.disCNS.buttoncolorbrand + BDFDB.disCNS.buttonsizemedium}`;
          const styleName = 'margin:0px 4px 4px 0; display:inline; width:auto; max-width:100%;';
          const html = `<button class="${className}" style="${styleName}"><div class="${BDFDB.disCN.buttoncontents}">${escape}</div></button>`;
          if (index === 0) return `<div name="recent" class="category-2U57w6 da-category">Default</div>${html}`;
          return html;
        }
      }).join('');
      const buttonItemsHtml =
        `<div id="send-command" class="layer-v9HyYc da-layer" style="width: 350px; right: 308px; bottom: 82px;">
          <div tabindex="0" role="button">
            <div class="emojiPicker-3m1S-j da-emojiPicker">
              <div class="scrollerWrap-2lJEkd firefoxFixScrollFlex-cnI2ix da-scrollerWrap da-firefoxFixScrollFlex scrollerWrap-PyxcLY da-scrollerWrap scrollerThemed-2oenus da-scrollerThemed themeLight-1_DWyY scrollerFade-1Ijw5y da-scrollerFade scrollerTrack-1ZIpsv da-scrollerTrack">
                <div class="scroller-2FKFPG firefoxFixScrollFlex-cnI2ix da-scroller da-firefoxFixScrollFlex systemPad-3UxEGl da-systemPad scroller-3vODG7 da-scroller">${buttonItems}</div>
              </div>
            </div>
          </div>
        </div>`;
      $('#app-mount > [data-no-focus-lock] > .da-layerContainer').html(buttonItemsHtml);
    });
    // コマンド入力
    $(document).on('click', '#send-command button', function() {
      const txt = $(this).text();
      const val = $('.da-textArea').val();
      const replaceTxt = (val === '') ? txt : `${val} ${txt}`;
      let ta = Utils.getTextArea();
      Utils.insertText(ta[0], replaceTxt);
      ta[0].dispatchEvent(new Event('input', {
        bubbles: true
      }));
      $('#send-command').remove();
    });
    // コマンド非表示
    $(document).click(function(event) {
      const svg = $(event.target).parents('[aria-label="command"]').length;
      const cmd = $(event.target).parents('#send-command').length;
      if (!svg && !cmd) $('#send-command').remove();
    });
    // コマンド追加
    $(document).on('click', '#add-command', function() {
      const val = $('#input-command').val();
      if (val === '') {
        BdApi.alert('コマンドが空欄です', 'コマンドは必ず入力して下さい。');
      } else if (!commandList.includes(val)) {
        commandList.push(val);
        const htmlCommandList = ShortcutCommands.prototype.getHTML_CommandList();
        $('#list-command').html(htmlCommandList);
        $('#input-command').val('');
        BdApi.saveData(ShortcutCommands.prototype.getName(), 'commandList', commandList);
      } else {
        BdApi.alert('コマンドが既に登録済みです', '同じコマンドは登録できません。');
      }
    });
    // コマンド更新
    $(document).on('change', '#list-command input', function() {
      const ary = $('#list-command > div').map(function(i, e) {
        return $(e).find('input').val();
      }).get();
      commandList = ary;
      BdApi.saveData(ShortcutCommands.prototype.getName(), 'commandList', commandList);
    });
    // コマンド削除
    $(document).on('click', '#delete-command', function() {
      const $parent = $(this).parent();
      const val = $parent.children('input').val();
      const index = $('#list-command > div').index($parent);
      BdApi.showConfirmationModal('確認っす',
        [`「${val}」を削除してもいいですか？`], {
          danger: true,
          confirmText: '削除する',
          cancelText: 'キャンセル',
          onConfirm: function() {
            commandList.splice(index, 1);
            $parent.remove();
            BdApi.saveData(ShortcutCommands.prototype.getName(), 'commandList', commandList);
          }
        }
      );
    });
  }
  stop() {
    this.log('stop', this.getVersion());
    if ($('[aria-label="command"]').length) $('[aria-label="command"]').remove();
  }
  onSwitch() {
    this.setCommandButton(); // コマンド表示ボタンを設置
  }
  
  setCommandButton() {
    const html =
      `<button aria-label="command" type="button" class="buttonWrapper-1ZmCpA da-buttonWrapper button-38aScr da-button lookBlank-3eh9lL colorBrand-3pXr91 grow-q77ONN da-grow">
        <div class="contents-18-Yxp da-contents button-3AYNKb da-button button-2vd_v_ da-button">
          <svg viewBox="0 0 512 512" width="22" height="22"><path fill="currentColor" d="M256 0a256 256 0 1 0 0 512 256 256 0 0 0 0-512zm-69 203v1l-72 54 72 53v35h-1L82 269l-1-1v-21l1-1 104-77a1 1 0 0 1 1 0v34zm52 157l-1 1h-30v-1l65-208 1-1h30v1l-65 208zm192-92l-1 1-104 77h-1v-34-1l72-53-72-54v-34-1a1 1 0 0 1 1 0l104 77 1 1v21z"></svg>
        </div>
      </button>`;
    if (!$('[aria-label="command"]').length) $('.da-buttons').append(html);
  }
  escapeHtml(str) {
    const rep = str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
    return rep;
  }
  getSettingsPanel() {
    if (!global.BDFDB || typeof BDFDB != 'object' || !BDFDB.loaded) return;
    const SettingsPanel = this.getHTML_SettingsPanel();
    const CommandList = this.getHTML_CommandList();
    const $SettingsPanel = $(SettingsPanel);
    $SettingsPanel.find('#list-command').html(CommandList);
    return $SettingsPanel.html();
  }
  getHTML_SettingsPanel() {
    const html =
      `<div class="${this.getName()}-settings BDFDB-settings">
      <div class="${BDFDB.disCNS.titledefault + BDFDB.disCNS.title}">${this.getName()}</div>
      <div class="add-${this.getName()}-settings">
        <h3>新しいコマンドを追加:</h3>
        <div class="${BDFDB.disCNS.horizontal + BDFDB.disCNS.directionrow + BDFDB.disCNS.justifystart + BDFDB.disCNS.aligncenter + BDFDB.disCNS.nowrap + BDFDB.disCN.marginbottom8}">
          <input type="text" placeholder="コマンド" class="${BDFDB.disCNS.inputdefault + BDFDB.disCNS.input + BDFDB.disCN.size16}" id="input-command">
          <button type="button" class="${BDFDB.disCNS.flexchild + BDFDB.disCNS.button + BDFDB.disCNS.buttonlookfilled + BDFDB.disCNS.buttoncolorbrand + BDFDB.disCNS.buttonsizemedium}" id="add-command">追加</button>
        </div>
        <h3>コマンドリスト:</h3>
        <div id="list-command"></div>
      </div>
    </div>`;
    return html;
  }
  getHTML_CommandList() {
    const html = commandList.map(function(val) {
      const escape = ShortcutCommands.prototype.escapeHtml(val);
      const h =
        `<div class="${BDFDB.disCNS.horizontal + BDFDB.disCNS.directionrow + BDFDB.disCNS.justifystart + BDFDB.disCNS.aligncenter + BDFDB.disCNS.nowrap + BDFDB.disCN.marginbottom8}">
          <svg class="list-command-handle ${BDFDB.disCNS.flexchild}" viewBox="0 0 512 512" width="24" height="24"><path fill="currentColor" d="M512 256l-114-74v42H288V114h42L256 0l-74 114h42v110H114v-42L0 256l114 74v-42h110v110h-42l74 114 74-114h-42V288h110v42z"/></svg>
          <input type="text" class="${BDFDB.disCNS.inputdefault + BDFDB.disCNS.input + BDFDB.disCN.size16}" value="${escape}">
          <button type="button" class="${BDFDB.disCNS.flexchild + BDFDB.disCNS.button + BDFDB.disCNS.buttonlookfilled + BDFDB.disCNS.buttoncolorgrey + BDFDB.disCNS.buttonsizemedium}" id="delete-command">削除</button>
        </div>`;
      return h;
    }).join('');
    return html;
  }
  observer(changes) {
    const id = $(changes.target).attr('id');
    if (id === 'plugin-settings-ShortcutCommands') {
      if (SortableCreated) return;
      SortableCreated = true;
      Sortable.create($('#list-command').get(0), {
        group: 'list-command',
        handle: '.list-command-handle',
        animation: 300,
        onSort: function() {
          const ary = $('#list-command > div').map(function(i, e) {
            return $(e).find('input').val();
          }).get();
          commandList = ary;
          BdApi.saveData(ShortcutCommands.prototype.getName(), 'commandList', commandList);
        }
      });
    } else {
      SortableCreated = false;
    }
  }
  log(msg, data) {
    const name = this.getName();
    console.log(`%c[${name}] ${msg}`, 'color:#C9242F', data);
  }
}