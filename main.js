DomReady.ready(function() {
  window.mathboxSetup();

  var spectrogram = new window.Spectrogram(mathbox);
  var synth = new window.Synth();
  var maestro = new window.Maestro(synth);

  setTimeout(function() {
    spectrogram.add([new Note(69, 1), new Note(71, 1)]);
  }, 1000);

  setTimeout(function() {
    spectrogram.remove([new Note(69, 0)]);
  }, 3000);

  setTimeout(function() {
    spectrogram.remove([new Note(71, 0)]);
  }, 6000);
});
