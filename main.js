DomReady.ready(function() {
  window.mathboxSetup();

  var spectrogram = new window.Spectrogram(mathbox);
  var synth = new window.Synth(spectrogram);

  // // Test code
  // setTimeout(function() {
  //   spectrogram.add(new Note(69));
  // }, 1000);

  // setTimeout(function() {
  //   spectrogram.add(new Note(71));
  // }, 1100);

  // setTimeout(function() {
  //   spectrogram.remove(new Note(69));
  // }, 5000);

  // setTimeout(function() {
  //   spectrogram.remove(new Note(71));
  // }, 8000);
});
