window.MidiControl = function MidiControl(spectrogram) {

	this.spectrogram = spectrogram;

	var keysPressed = [];
	var player = MIDI.Player;

	var midiFileDir = "midifiles/";
	var midiFiles = ["test1.mid", "test2.mid", "test3.mid", "test4.mid"];
	var currentMidiFile = "";

	var fnVisualizeNote = function(keyNumber, keyChannel) {
        var note = new Note(keyNumber, 127);
        spectrogram.add(note);
	};

    var fnUnvisualizeNote = function(keyNumber, keyChannel) {
        var note = new Note(keyNumber, 127);
        spectrogram.remove(note);
    };

	var fnControlSong = function (e) {

		var numKnownMidiFiles = midiFiles.length;

		if (e.keyCode - 49 < numKnownMidiFiles) {
			midiFile = midiFiles[e.keyCode-49];

			if (midiFile === currentMidiFile) {
				if (player.playing) {
					player.pause();
				}
				else {
					player.resume();
				}
			}

			else {
				player.stop();
				fnPlaySongFromMidi(midiFileDir+midiFile);
			}

			currentMidiFile = midiFile;
		}
	}

	var fnPlaySongFromMidi = function (midiFile) {
		/// this sets up the MIDI.Player and gets things going...
		player.removeListener();
		player.loadFile(midiFile, player.start);
		player.addListener(function(data) {
			var pianoKey = data.note - 21;
			// TODO: THIS IS A NOTE WE KNOW HOW TO PLAY
			if (true) {
				// note is starting to play
				if (data.message === 144) {
					keysPressed.push(pianoKey);
					fnVisualizeNote(pianoKey, data.channel);
				}
				// note was playing but is no longer
				else if (data.message == 128) {
					var i = keysPressed.length;
					while(i--) {
						if(keysPressed[i]==pianoKey) {
							keysPressed.splice(i, 1);
						}
					}
                    fnUnvisualizeNote(pianoKey, data.channel);
				}
			}
		});
	}

	window.onload = function () {
		MIDI.loadPlugin({
			soundfontUrl: "./soundfont/",
			instrument: "acoustic_grand_piano",
			onprogress: function(state, progress) {
				console.log(state, progress);
			},
			onsuccess: function() {
                MIDI.programChange(1, 0);
				window.addEventListener('keydown', fnControlSong);
			}
		});
	};
};