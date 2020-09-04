
define(function() {
  function CardBuilder() {
    this.title = null;
    this.title_clazz = null;
    this.subtitle = null;
    this.subtitle_clazz = null;
    this.fields = [];
    this.image = null;
  }

  function makeElement(type, clazz, innerHTML = "") {
    let el = document.createElement(type);
    el.className = clazz;
    el.innerHTML = innerHTML;
    return el;
  }

  CardBuilder.prototype.withTitle = function(title, clazz = "") {
    clazz += " title";

    this.title = title;
    this.title_clazz = clazz;
    return this;
  };

  CardBuilder.prototype.withSubtitle = function(subtitle, clazz = "") {
    clazz += "i light";

    this.subtitle = subtitle;
    this.subtitle_clazz = clazz;
    return this;
  };

  CardBuilder.prototype.withField = function(name, value, clazz = "") {
    this.fields.push({name: name, value: value, clazz: clazz});
    return this;
  };

  function makeTable() {
    let table = document.createElement("table");
    table.className = "mine";

    let colgroup = document.createElement("colgroup");
    table.appendChild(colgroup);

    colgroup.appendChild(makeElement("col", "tdleft tdleft-width"));
    colgroup.appendChild(makeElement("col", "tdright"));

    table.createTHead();
    return table;
  }

  CardBuilder.prototype.build = function() {
    let container = document.getElementById("container");

    let table = makeTable();
    let headerRow = table.tHead.insertRow();
    let header = document.createElement("th");
    headerRow.appendChild(header);
    header.colSpan = 2;

    let titleDiv = makeElement("div", this.title_clazz, this.title);
    header.appendChild(titleDiv);

    let subtitleDiv = makeElement("div", this.subtitle_clazz, this.subtitle);
    header.appendChild(subtitleDiv);

    for (var field of this.fields) {
      if (field.value.length == 0) {
        continue;
      }

      let row = table.insertRow(-1);
      let tdleft = makeElement("td", "tdleft", field.name);
      let tdright = makeElement("td", "tdright " + field.clazz, field.value);

      row.appendChild(tdleft);
      row.appendChild(tdright);
    }

    container.appendChild(table);

    container.appendChild(makeElement("div", "icon"));
  };

  return CardBuilder;
});
