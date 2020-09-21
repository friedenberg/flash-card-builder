
define(
    [
      '_util',
    ],
    function(Util) {
      function FieldImage(image, caption, imageClazz) {
        this.image = image;
        this.imageClazz = imageClazz;
        this.caption = caption;
      }

      FieldImage.prototype.shouldIgnore = function() {
        return false;
      };

      FieldImage.prototype.build = function(table) {
        if (this.caption.length > 0) {
          const tdCaption = Util.makeElement('td');
          tdCaption.colSpan = 2;
          tdCaption.appendChild(Util.makeElement('div', 'caption i',
              this.caption));

          const rowCaption = table.insertRow(-1);
          rowCaption.appendChild(tdCaption);
        }

        const row = table.insertRow(-1);
        const tdImage = Util.makeElement('td');
        tdImage.colSpan = 2;
        tdImage.appendChild(Util.makeElement('div', `image ${this.imageClazz}`,
            this.image));

        row.appendChild(tdImage);
      };

      return FieldImage;
    },
);
