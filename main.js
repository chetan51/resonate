DomReady.ready(function() {
  window.mathboxSetup();

  mathbox.grid();
  mathbox.curve({
    id: 'my-curve',
    domain: [0, 0.1],
    n: 1024,
    expression: function (x) { return 0; },
  })

  function pulse(scale) {
    mathbox.animate('#my-curve', {
      expression: function (x) { return scale * Math.sin(440*x * 2*Math.PI); },
    }, {
      duration: 1000,
      callback: function() {
        pulse(scale == 1 ? 0 : 1);
      }
    });
  }

  pulse(1);
});
