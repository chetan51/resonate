window.Note = function(keyNumber, velocity) {
    this.keyNumber = keyNumber;
    this.velocity = velocity;
}

Note.prototype.frequency = function() {
    return Math.pow(2, (this.keyNumber - 69) / 12.0) * 440;
}
