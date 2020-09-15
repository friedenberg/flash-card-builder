
define(
    [
      '_util',
    ],
    function(Util) {
      const labelsToSymbols = {
        backspace: "⌫ Del",
        command: "⌘ Cmd",
        control: "⌃ Ctrl",
        delete: "⌦ Del",
        down_arrow: "↓ Down",
        enter: "⌤ Ent",
        left_arrow: "← Left",
        option: "⌥ Opt",
        return: "⏎ Ret",
        right_arrow: "→ Right",
        shift: "⇧ Shift",
        space: "⎵ Space",
        up_arrow: "↑ Up",
        vertical_arrow: "↕ Up / Down",
        horizontal_arrow: "↔ Left / Right",
        escape: "⎋ Esc",
      };

      function FieldKeys(name, modifiers, keys, leftClazz = '', rightClazz =
      '') {
        this.name = name;
        this.modifiers = [];
        this.keys = [];

        if (modifiers.length > 0) {
          this.modifiers = modifiers.split(' ');
        }

        if (keys.length > 0) {
          this.keys = keys.split(' ');
        }

        this.leftClazz = leftClazz;
        this.rightClazz = rightClazz;
      }

      FieldKeys.prototype.shouldIgnore = function() {
        return false;
      };

      FieldKeys.prototype.build = function(table) {
        let row = table.insertRow(-1);
        row.appendChild(this.buildLeft());
        row.appendChild(this.buildRight());
      };

      FieldKeys.prototype.buildLeft = function() {
        return Util.makeElement('td', 'tdleft ' + this.leftClazz, this.name);
      };

      FieldKeys.prototype.buildRight = function() {
        const makeSpan = function(m) {
          if (labelsToSymbols.hasOwnProperty(m)) {
            m = labelsToSymbols[m];
          }

          return '<span class="keys">' + m + '</span>';
        };

        const modifiers = this.modifiers.map(makeSpan);
        const keys = this.keys.map(makeSpan);

        const text = modifiers.concat(keys).join('<span>+</span>');

        return Util.makeElement('td', 'tdright ' + this.rightClazz, text);
      };

      return FieldKeys;
    });
