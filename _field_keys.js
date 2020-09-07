
define(
    [
      '_util',
    ],
    function(Util) {
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
        const modifiers = this.modifiers.map(
            function(m) {
              return '<span class="keys">' + m + '</span>';
            },
        );

        const keys = this.keys.map(
            function(k) {
              return '<span class="keys">' + k + '</span>';
            },
        );

        const text = modifiers.concat(keys).join('<span>+</span>');

        return Util.makeElement('td', 'tdright ' + this.rightClazz, text);
      };

      return FieldKeys;
    });
