
define(
    [
      '_util',
    ],
    function(Util) {
      function FieldMath(name, value, leftClazz, rightClazz) {
        this.name = name;
        this.value = value;
        this.leftClazz = leftClazz;
        this.rightClazz = rightClazz;
      }

      FieldMath.prototype.shouldIgnore = function() {
        return this.value.length == 0;
      };

      FieldMath.prototype.build = function(table) {
        const row = table.insertRow(-1);
        row.appendChild(this.buildLeft());
        row.appendChild(this.buildRight());
      };

      FieldMath.prototype.buildLeft = function() {
        return Util.makeElement('td', this.leftClazz, this.name);
      };

      FieldMath.prototype.buildRight = function() {
        const value = '\\( ' + this.value + ' \\)';
        const el = Util.makeElement('td', this.rightClazz, value);
        return el;
      };

      return FieldMath;
    },
);
