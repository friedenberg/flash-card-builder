
define(
    [
      '_util',
      '_field_basic',
      '_field_image',
      '_field_keys',
      '_field_math',
    ],
    function(Util, FieldBasic, FieldImage, FieldKeys, FieldMath) {
      function CardBuilder() {
        this.title = null;
        this.title_clazz = null;
        this.subtitle = null;
        this.subtitle_clazz = null;
        this.fields = [];
        this.image = null;

        const cardDSL = document.getElementById('card-dsl');

        let dsl = cardDSL.innerHTML;

        if (cardDSL.tagName.toString() === 'SCRIPT') {
          dsl = cardDSL.text;
        }

        if (dsl.length === 0) {
          return;
        }

        dsl = dsl.trim();

        const lines = dsl.split('\n');

        for (const line of lines) {
          const matchData = line.match(/(?:^\[((?:[-\s\w]*)+)\]\s+)?(?:\(([-\s\w]*)\)\s+)?([^:]+):\s*(?:\(([-\s\w]*)\))?(.*)/);

          if (matchData === null) {
            console.log('match data was null');
            console.log(`line: ${line}`);
            continue;
          }

          let type = matchData[1];
          const leftClazz = matchData[2];
          const label = matchData[3].trim();
          const rightClazz = matchData[4];
          let content = matchData[5];

          const contentType = typeof content;
          if (contentType !== 'string') {
            console.log(`expected match data to be string but was ${contentType}`);
            console.log(`line: ${line}`);
            continue;
          }

          content = content.trim();

          if (content.length === 0) {
            continue;
          }

          switch (label) {
            case 'title':
              type = 'title';
              break;

            case 'subtitle':
              type = 'subtitle';
              break;
          }

          console.log(content);

          switch (type) {
            case 'title':
              this.title = content;
              this.title_clazz = `${rightClazz} title`;
              break;

            case 'subtitle':
              this.subtitle = content;
              this.subtitle_clazz = `${rightClazz} i light`;
              break;

            case 'img':
              this.fields.push(
                  new FieldImage(
                      content, label, rightClazz,
                  ),
              );
              break;

            case 'kb':
              this.fields.push(
                  new FieldKeys(
                      label, content, leftClazz, rightClazz,
                  ),
              );
              break;

            case 'm':
              this.fields.push(
                  new FieldMath(
                      label,
                      content,
                      `${leftClazz} tdleft small-caps`,
                      `${rightClazz} tdright`,
                  ),
              );
              break;

            default:
              this.fields.push(
                  new FieldBasic(
                      label,
                      content,
                      `${rightClazz} tdright`,
                      `${leftClazz} tdleft small-caps`,
                  ),
              );
          }
        }
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

      CardBuilder.prototype.withField = function(name, value, rightClazz = '',
          leftClazz = '') {
        this.fields.push(
            new FieldBasic(
                name,
                value,
                `${rightClazz} tdright`,
                `${leftClazz} tdleft small-caps`,
            ),
        );

        return this;
      };

      CardBuilder.prototype.withCodeField = function(value, rightClazz =
      '', leftClazz = '') {
        this.fields.push(
            new FieldBasic(
                '$',
                value,
                `${rightClazz} tdright code`,
                `${leftClazz} tdleft code`,
            ),
        );

        return this;
      };

      CardBuilder.prototype.withFieldObject = function(field) {
        this.fields.push(field);
        return this;
      };

      CardBuilder.prototype.withImage = function(image, caption = '', imageClazz
      = '') {
        this.fields.push(new FieldImage(image, caption, imageClazz));
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
        const container = document.getElementById('card-dsl').parentNode;

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

          field.build(table);
        }

        container.appendChild(table);

        container.appendChild(Util.makeElement('div', 'icon'));
        window.MathJax.Hub.Queue(['Typeset', MathJax.Hub, table]);
      };

      return CardBuilder;
    });
