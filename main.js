DomReady.ready(function() {
  window.mathboxSetup();

  var spectrogram = new window.Spectrogram(mathbox);
  var synth = new window.Synth();
  var maestro = new window.Maestro(synth);

  setTimeout(function() {
    spectrogram.add([440.0, 480.0]);
  }, 1000);

  setTimeout(function() {
    spectrogram.remove([440.0]);
  }, 3000);

  setTimeout(function() {
    spectrogram.remove([480.0]);
  }, 6000);
});
