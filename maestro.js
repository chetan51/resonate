window.Maestro = function(synth) {
    this.synth = synth;

    this.update();
}

Maestro.prototype.update = function() {
    var self = this;

    setTimeout(function() {
        self.update();
    });
}
