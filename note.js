window.Note = function(keyNumber, duration) {
    this.keyNumber = keyNumber;
    this.duration = duration;
}

Note.prototype.frequency = function() {
    return Math.pow(2, (this.keyNumber - 69) / 12.0) * 440;
}
