
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
          let tdCaption = Util.makeElement("td");
          tdCaption.colSpan = 2;
          tdCaption.appendChild(Util.makeElement('div', 'caption i', this.caption));

          let rowCaption = table.insertRow(-1);
          rowCaption.appendChild(tdCaption);
        }

        let row = table.insertRow(-1);
        let tdImage = Util.makeElement("td");
        tdImage.colSpan = 2;
        tdImage.appendChild(Util.makeElement('div', `image ${this.imageClazz}`, this.image));

        row.appendChild(tdImage);
      };

      return FieldImage;
    });
