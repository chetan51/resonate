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

    var queue = this.notes[note.keyNumber] = this.notes[note.keyNumber] || [];
    queue.push(note);

    var curveId = 'note-' + note.keyNumber + '-' + queue.length;

    self.mathbox.curve({
      id: curveId,
      domain: self.mathbox.viewport().axis(0),
      n: 1024,
      lineWidth: 1,
      color: parseInt(randomColor({hue: 'blue'}).replace(/^#/, ''), 16),
    });

    self.mathbox.animate('#' + curveId, {
      expression: function (x) { return note.normalizedVelocity() * Math.sin(note.frequency() * x * 2*Math.PI); },
    }, {
      duration: self.animationDuration,
    });

    this.updateComposite();
}

Spectrogram.prototype.remove = function(note) {
    var self = this;

    var queue = this.notes[note.keyNumber];
    var curveId = 'note-' + note.keyNumber + '-' + queue.length;

    queue.shift();
    if (queue.length == 0) delete this.notes[note.keyNumber];

    self.mathbox.animate('#' + curveId, {
      expression: function (x) { return 0; },
    }, {
      duration: self.animationDuration,
      callback: function() {
        self.mathbox.animate('#' + curveId, {
            opacity: 0,
        }, {
            duration: self.animationDuration,
            callback: function () {
                self.mathbox.remove('#' + curveId);
            }
        });
      }
    });

    this.updateComposite();
}

Spectrogram.prototype.updateComposite = function() {
    var self = this;
    var notes = _.map(this.notes, _.clone);

    this.mathbox.animate('#composite', {
      expression: function (x) {
        var y = 0;

        for (var keyNumber in notes) {
            var queue = notes[keyNumber];

            for (var note of queue) {
                y += note.normalizedVelocity() * Math.sin(note.frequency() * x * 2*Math.PI);
            }
        }

        return y;
      },
    }, {
      duration: this.animationDuration,
      immediately: true
    });
}
