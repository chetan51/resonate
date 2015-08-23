window.Synth = function Synth(spectrogram) {

    this.spectrogram = spectrogram;

	var isMobile = !!navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i);
	if(isMobile) { var evtListener = ['touchstart', 'touchend']; } else { var evtListener = ['mousedown', 'mouseup']; }

	var __audioSynth = new AudioSynth();
	__audioSynth.setVolume(0.5);
	var __octave = 4;
	
	// Change octave
	var fnChangeOctave = function(x) {

		x |= 0;
	
		__octave += x;
	
		__octave = Math.min(5, Math.max(3, __octave));
	};

	// Key bindings, notes to keyCodes.
	var keyboard = {
		
			/* 2 */
			50: 'C#,-1',
			
			/* 3 */
			51: 'D#,-1',
			
			/* 5 */
			53: 'F#,-1',
			
			/* 6 */
			54: 'G#,-1',
			
			/* 7 */
			55: 'A#,-1',
			
			/* 9 */
			57: 'C#,0',
			
			/* 0 */
			48: 'D#,0',
			
			/* + */
			187: 'F#,0',
			61: 'F#,0',
			
			/* Q */
			81: 'C,-1',
			
			/* W */
			87: 'D,-1',
			
			/* E */
			69: 'E,-1',
			
			/* R */
			82: 'F,-1',
			
			/* T */
			84: 'G,-1',
			
			/* Y */
			89: 'A,-1',
			
			/* U */
			85: 'B,-1',
			
			/* I */
			73: 'C,0',
			
			/* O */
			79: 'D,0',
			
			/* P */
			80: 'E,0',
			
			/* [ */
			219: 'F,0',
			
			/* ] */
			221: 'G,0',
		
			/* A */
			65: 'G#,0',
		
			/* S */
			83: 'A#,0',
			
			/* F */
			70: 'C#,1',
		
			/* G */
			71: 'D#,1',
		
			/* J */
			74: 'F#,1',
		
			/* K */
			75: 'G#,1',
		
			/* L */
			76: 'A#,1',
		
			/* Z */
			90: 'A,0',
		
			/* X */
			88: 'B,0',
		
			/* C */
			67: 'C,1',
		
			/* V */
			86: 'D,1',
		
			/* B */
			66: 'E,1',
		
			/* N */
			78: 'F,1',
		
			/* M */
			77: 'G,1',
			
			/* , */
			188: 'A,1',
			
			/* . */
			190: 'B,1'
		
		};
	
	var reverseLookupText = {};
	var reverseLookup = {};

	// Create a reverse lookup table.
	for(var i in keyboard) {
	
		var val;

		switch(i|0) {
		
			case 187:
				val = 61;
				break;
			
			case 219:
				val = 91;
				break;
			
			case 221:
				val = 93;
				break;
			
			case 188:
				val = 44;
				break;
			
			case 190:
				val = 46;
				break;
			
			default:
				val = i;
				break;
			
		}
	
		reverseLookupText[keyboard[i]] = val;
		reverseLookup[keyboard[i]] = i;
	
	}

    var noteMap = {'C':24,'C#':25,'D':26,'D#':27,'E':28,'F':29,'F#':30,'G':31,'G#':32,'A':21,'A#':22,'B':23};

	// Keys you have pressed down.
	var keysPressed = [];
	var soundId = 0;

	// Creates our audio player
	var fnPlayNote = function(note, octave) {

		src = __audioSynth.generate(soundId, note, octave, 2);

        var keyNumber = noteMap[note] + octave * 12;
        var note = new Note(keyNumber, 127);

        spectrogram.add(note);

		container = new Audio(src);
		container.addEventListener('ended', function() {
            container = null;
            spectrogram.remove(note);
        });
		container.addEventListener('loadeddata', function(e) { e.target.play(); });
		container.autoplay = false;
		container.setAttribute('type', 'audio/wav');
		container.load();

		return container;
	
	};

	// Detect keypresses, play notes.

	var fnPlayKeyboard = function(e) {
	
		var i = keysPressed.length;
		while(i--) {
			if(keysPressed[i]==e.keyCode) {
				return false;	
			}
		}
		keysPressed.push(e.keyCode);
	
		switch(e.keyCode) {
		
			// left
			case 37:
				fnChangeOctave(-1);
				break;
		
			// right
			case 39:
				fnChangeOctave(1);
				break;
		
			// space
			case 16:
				break;
				fnPlaySong([
					['E,0', 8],
					['D,0', 8],
					['C,0', 2],
					['C,0', 8],
					['D,0', 8],
					['C,0', 8],
					['E,0', 8],
					['D,0', 1],
					['C,0', 8],
					['D,0', 8],
					['E,0', 2],
					['A,0', 8],
					['G,0', 8],
					['E,0', 8],
					['C,0', 8],
					['D,0', 1],
					['A,0', 8],
					['B,0', 8],
					['C,1', 2],
					['B,0', 8],
					['C,1', 8],
					['D,1', 8],
					['C,1', 8],
					['A,0', 1],
					['G,0', 8],
					['A,0', 8],
					['B,0', 2],
					['C,1', 8],
					['B,0', 8],
					['A,0', 8],
					['G,0', 8],
					['A,0', 1]
				]);
				break;
		
		}
	
		if(keyboard[e.keyCode]) {
			var arrPlayNote = keyboard[e.keyCode].split(',');
			var note = arrPlayNote[0];
			var octaveModifier = arrPlayNote[1]|0;
			fnPlayNote(note, __octave + octaveModifier);
		} else {
			return false;	
		}
	
	}

	// Remove key bindings once note is done.

	var fnRemoveKeyBinding = function(e) {
	
		var i = keysPressed.length;
		while(i--) {
			if(keysPressed[i]==e.keyCode) {
				keysPressed.splice(i, 1);
			}
		}
	
	}

	var fnPlaySong = function(arr) {
	
		if(arr.length>0) {
		
			var noteLen = 1000*(1/parseInt(arr[0][1]));
			if(!(arr[0][0] instanceof Array)) {
				arr[0][0] = [arr[0][0]];	
			}
			var i = arr[0][0].length;
			var keys = [];
			while(i--) {
				keys.unshift(reverseLookup[arr[0][0][i]]);
				fnPlayKeyboard({keyCode:keys[0]});
			}
			arr.shift();
			setTimeout(function(array, val){ return function() { var i = val.length; while(i--) { fnRemoveKeyBinding({keyCode:val[i]}); } fnPlaySong(array); } }(arr, keys), noteLen);
		
		}
	
	};

	// Set up global event listeners

	window.addEventListener('keydown', fnPlayKeyboard);
	window.addEventListener('keyup', fnRemoveKeyBinding);

    return this;
}
