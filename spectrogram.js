window.Spectrogram = function(mathbox) {
    this.mathbox = mathbox;

    this.animationDuration = 200;

    this.frequencies = []

    this.mathbox.curve({
      id: 'composite',
      color: 0x000000,
      domain: this.mathbox.viewport().axis(0),
      n: 1024,
      lineWidth: 2,
    });
}

Spectrogram.prototype.add = function(frequencies) {
    var self = this;

    this.frequencies = this.frequencies.concat(frequencies);

    for (frequency of frequencies) {
        var addCurve = function(frequency) {
            self.mathbox.curve({
              id: 'frequency-' + frequency,
              domain: self.mathbox.viewport().axis(0),
              n: 1024,
              lineWidth: 1,
              color: parseInt(randomColor({hue: 'blue'}).replace(/^#/, ''), 16),
            });

            self.mathbox.animate('#frequency-' + frequency, {
              expression: function (x) { return Math.sin(frequency * x * 2*Math.PI); },
            }, {
              duration: self.animationDuration,
            });
        }

        addCurve(frequency);
    }

    this.updateComposite();
}

Spectrogram.prototype.remove = function(frequencies) {
    var self = this;

    for (frequency of frequencies) {
        var removeCurve = function(frequency) {
            var index = self.frequencies.indexOf(frequency);
            if (index > -1) self.frequencies.splice(index, 1);

            self.mathbox.animate('#frequency-' + frequency, {
              expression: function (x) { return 0; },
            }, {
              duration: self.animationDuration,
              callback: function() {
                self.mathbox.animate('#frequency-' + frequency, {
                    opacity: 0,
                }, {
                    duration: self.animationDuration,
                    callback: function () {
                        self.mathbox.remove('#frequency-' + frequency);
                    }
                });
              }
            });
        }

        removeCurve(frequency);
    }

    this.updateComposite();
}

Spectrogram.prototype.updateComposite = function() {
    var self = this;
    var frequencies = self.frequencies.slice();

    this.mathbox.animate('#composite', {
      expression: function (x) {
        var y = 0;

        for (frequency of frequencies) {
            y += Math.sin(frequency * x * 2*Math.PI);
        }

        return y;
      },
    }, {
      duration: this.animationDuration,
    });
}
