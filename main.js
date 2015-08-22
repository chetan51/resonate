DomReady.ready(function() {
  window.mathboxSetup();

  mathbox.grid();

  function pulse(curve, scale) {
    mathbox.animate('#my-curve-' + curve, {
      expression: function (x) { return scale * Math.sin(curve + 44*x * 2*Math.PI); },
    }, {
      duration: 3000,
      callback: function() {
        pulse(curve, scale == 1 ? 0 : 1);
      }
    });
  }

  for (var i = 0; i < 20; i++) {
    mathbox.curve({
      id: 'my-curve-' + i,
      domain: [0, 0.1],
      n: 1024,
      expression: function (x) { return 0; },
    })

    pulse(i, 1);
  }
});
