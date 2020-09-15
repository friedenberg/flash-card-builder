
define(
    function() {
      return {
        makeElement: function(type, clazz, innerHTML = '') {
          const el = document.createElement(type);
          el.className = clazz;
          el.innerHTML = innerHTML;
          return el;
        },
      };
    },
);
