DomReady.ready(function() {
  // MathBox boilerplate
  var mathbox = window.mathbox = mathBox({
    cameraControls: true,
    cursor:         true,
    controlClass:   ThreeBox.OrbitControls,
    elementResize:  true,
    fullscreen:     true,
    screenshot:     true,
    stats:          false,
    scale:          1,
  }).start();

  // Set up director
  var script = window.mathboxScript;
  var director = window.director = new MathBox.Director(mathbox, script);

  // Arrow controls
  // Controls for stand-alone
  window.addEventListener('touchstart', function (e) {
    director.forward();
    document.getElementById('info').style.opacity = '0';
  });
  window.addEventListener('keydown', function (e) {
    if (e.keyCode == 38 || e.keyCode == 37) director.back();
    else if (e.keyCode == 40 || e.keyCode == 39) director.forward();
    else {
      return;
    }

    document.getElementById('info').style.opacity = '0';
  });

  window.mathboxSetup(mathbox);

  mathbox.grid();
  mathbox.curve({
    id: 'my-curve',
    domain: [-3, 3],
    expression: function (x) { return Math.cos(x); },
  })
  mathbox.animate('#my-curve', {
    color: 0x20c050,
  }, {
    duration: 1000,
  });
});
