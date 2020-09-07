
define(
    [
      '_util',
    ],
    function(Util) {
      function FieldBasic(name, value, rightClazz, leftClazz) {
        this.name = name;
        this.value = value;
        this.leftClazz = `${leftClazz} tdleft`;
        this.rightClazz = `${rightClazz} tdright`;
      }

      FieldBasic.prototype.shouldIgnore = function() {
        return this.value.length == 0;
      };

      FieldBasic.prototype.build = function(row) {
        row.appendChild(this.buildLeft());
        row.appendChild(this.buildRight());
      };

      FieldBasic.prototype.buildLeft = function() {
        return Util.makeElement('td', this.leftClazz, this.name);
      };

      FieldBasic.prototype.buildRight = function() {
        return Util.makeElement('td', this.rightClazz, this.value);
      };

      return FieldBasic;
    });
