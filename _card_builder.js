
define(
    [
      '_util',
      '_field_basic',
      '_field_image',
    ],
    function(Util, FieldBasic, FieldImage) {
      function CardBuilder() {
        this.title = null;
        this.title_clazz = null;
        this.subtitle = null;
        this.subtitle_clazz = null;
        this.fields = [];
        this.image = null;
      }

      CardBuilder.prototype.withTitle = function(title, clazz = '') {
        this.title = title;
        this.title_clazz = `${clazz} title`;
        return this;
      };

      CardBuilder.prototype.withSubtitle = function(subtitle, clazz = '') {
        this.subtitle = subtitle;
        this.subtitle_clazz = `${clazz} i light`;
        return this;
      };

      CardBuilder.prototype.withField = function(name, value, right_clazz = '',
          left_clazz = '') {
        this.fields.push(new FieldBasic(name, value, right_clazz, left_clazz));
        return this;
      };

      CardBuilder.prototype.withFieldObject = function(field) {
        this.fields.push(field);
        return this;
      };

      CardBuilder.prototype.withImage = function(image, caption) {
        this.fields.push(new FieldImage(image, caption));
        return this;
      };

      function makeTable() {
        const table = Util.makeElement('table');
        table.className = 'mine';

        const colgroup = Util.makeElement('colgroup');
        table.appendChild(colgroup);

        colgroup.appendChild(Util.makeElement('col', 'tdleft tdleft-width'));
        colgroup.appendChild(Util.makeElement('col', 'tdright'));

        table.createTHead();
        return table;
      }

      CardBuilder.prototype.build = function() {
        const container = document.getElementById('container');

        const table = makeTable();
        const headerRow = table.tHead.insertRow();
        const header = Util.makeElement('th');
        headerRow.appendChild(header);
        header.colSpan = 2;

        const titleDiv = Util.makeElement('div', this.title_clazz, this.title);
        header.appendChild(titleDiv);

        const subtitleDiv = Util.makeElement('div', this.subtitle_clazz,
            this.subtitle);
        header.appendChild(subtitleDiv);

        for (const field of this.fields) {
          if (field.shouldIgnore()) {
            continue;
          }

          const row = table.insertRow(-1);
          field.build(row);
        }

        container.appendChild(table);

        container.appendChild(Util.makeElement('div', 'icon'));
      };

      return CardBuilder;
    });
