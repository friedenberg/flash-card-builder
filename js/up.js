
if (typeof requirejs === 'undefined') {
  window.MathJax.Hub.options = {skipHtmlTags: ['script']};
  // window.MathJax.Hub.Queue(["Remove", MathJax.Hub]);

  const script = document.createElement('script');
  script.src = '_require.js';
  script.setAttribute('data-main', '_main.js');

  document.head.appendChild(script);
} else {
  require(
      [
        '_card_builder',
      ],
      function(CardBuilder) {
        new CardBuilder().build();
      },
  );
}
