window.Spectrogram = function(mathbox) {
    this.mathbox = mathbox;

    this.animationDuration = 300;

    this.notes = {}

    this.mathbox.curve({
      id: 'composite',
      color: 0x000000,
      domain: this.mathbox.viewport().axis(0),
      n: 1024,
      lineWidth: 2,
    });
}

Spectrogram.prototype.add = function(note) {
    var self = this;

    this.notes[note.keyNumber] = note;

    self.mathbox.curve({
      id: 'note-' + note.keyNumber,
      domain: self.mathbox.viewport().axis(0),
      n: 1024,
      lineWidth: 1,
      color: parseInt(randomColor({hue: 'blue'}).replace(/^#/, ''), 16),
    });

    self.mathbox.animate('#note-' + note.keyNumber, {
      expression: function (x) { return Math.sin(note.frequency() * x * 2*Math.PI); },
    }, {
      duration: self.animationDuration,
    });

    this.updateComposite();
}

Spectrogram.prototype.remove = function(note) {
    var self = this;

    delete self.notes[note.keyNumber];

    self.mathbox.animate('#note-' + note.keyNumber, {
      expression: function (x) { return 0; },
    }, {
      duration: self.animationDuration,
      callback: function() {
        self.mathbox.animate('#note-' + note.keyNumber, {
            opacity: 0,
        }, {
            duration: self.animationDuration,
            callback: function () {
                self.mathbox.remove('#note-' + note.keyNumber);
            }
        });
      }
    });

    this.updateComposite();
}

Spectrogram.prototype.updateComposite = function() {
    var self = this;
    var notes = _.clone(self.notes);

    this.mathbox.animate('#composite', {
      expression: function (x) {
        var y = 0;

        for (var keyNumber in notes) {
            var note = notes[keyNumber];
            y += Math.sin(note.frequency() * x * 2*Math.PI);
        }

        return y;
      },
    }, {
      duration: this.animationDuration,
      immediately: true
    });
}
