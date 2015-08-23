DomReady.ready(function() {
  window.mathboxSetup();

  spectrogram = new window.Spectrogram(mathbox);

  spectrogram.add([440.0, 480.0]);

  setTimeout(function() {
    spectrogram.remove([440.0]);
  }, 3000);

  setTimeout(function() {
    spectrogram.remove([480.0]);
  }, 6000);
});
