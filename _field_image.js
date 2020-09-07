
define(
    [
      '_util',
    ],
    function(Util) {
      function FieldImage(image, caption) {
        this.image = image;
        this.caption = caption;
      }

      FieldImage.prototype.shouldIgnore = function() {
        return false;
      };

      FieldImage.prototype.build = function(row) {
        const td = Util.makeElement('td');
        td.colSpan = 2;
        td.appendChild(Util.makeElement('div', 'image', this.image));
        row.appendChild(td);
      };

      return FieldImage;
    });
